import React, {
  useEffect, useState
} from 'react';
import BraftEditor from 'braft-editor';
import { message } from 'antd';
import { resetProtocal } from 'tmaito-utils';
import axios from 'axios';
import classnames from 'classnames';
import './style/index.less';

const excludeControls = ['emoji', 'code'];
const tenantId = '1181468218792591360';
const appId = 'file-transfer-service';
const STORAGE_ORIG = {
  OSS: 'OSS_PUBLIC',
  OSS_PRIVATE: 'OSS_PRIVATE',
  MINIO: 'MINIO'
};
const STORAGE_ORIG_VALUE = {
  OSS_PUBLIC: ' oss-public',
  OSS_PRIVATE: 'oss-private',
  MINIO: 'minio'
};
const expireTime = 300 * 1000; // 秒

const expiresDate = 365 * 2; // 年 文件存储时间

const maxFile = 100 * 1000 * 1024;

const Editor = ({ value = '', onChange, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleEditorChange = (contentValue) => {
    onChange(contentValue.toHTML() === '<p></p>' ? '' : contentValue);
    setContent(contentValue);
  };
  const [content, setContent] = useState(BraftEditor.createEditorState(null));

  useEffect(() => {
    if (value) setContent(BraftEditor.createEditorState(value));
  }, [value]);


  const upload = async (file, progress, error) => {
    // TODO 容错处理
    const [name, ext] = file.name.split('.');
    const fileName = `${name}_${Date.now()}.${ext}`;
    const channelRes = await axios({
      method: 'GET',
      url: `/api/${tenantId}/storage/v1/file/channel`,
      params: {
        tenantId,
        appId
      }
    }).then(({ data }) => data.result);
    const storageOrig = STORAGE_ORIG[channelRes] || STORAGE_ORIG.OSS;
    const signatureRes = await axios({
      method: 'GET',
      url: `/api/${tenantId}/storage/v1/file/signature/w`,
      params: {
        filePath: `public/${tenantId}/antcoop/`,
        storageOrig,
        expireTime,
        tenantId
      }
    }).then(({ data }) => data.result);
    const ossStatusRes = await axios({
      method: 'POST',
      url: signatureRes.urlStr,
      timeout: 2 * 60 * 1000,
      data: fileToFormData(file, fileName, signatureRes),
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        progress((loaded / total) * 100);
      }
    }).then(({ status }) => status === 200);
    let taskRef;
    if (ossStatusRes) {
      taskRef = await axios({
        method: 'POST',
        url: `/api/${tenantId}/storage/v1/file/files`,
        data: {
          appId,
          expiresDate,
          fileOriginName: fileName,
          fileSize: file.size,
          storageOrig: STORAGE_ORIG_VALUE[storageOrig],
          url: `${signatureRes.filePath}/${fileName}`,
          userId: 0
        }
      }).then(({ data }) => data.result);
    } else {
      message.error('文件上传失败，请重试！');
      return;
    }
    let fileUrlRes;
    if (Array.isArray(taskRef)) {
      const id = taskRef.toString();
      fileUrlRes = await axios({
        method: 'GET',
        url: `/api/${tenantId}/storage/v1/file/records/${id}/signature/r`,
        params: {
          id,
          tenantId,
          userId: 0,
          storageOrig,
          expireTime: 12000000 * 3650
        }
      }).then(({ data }) => data.result);
    }
    if (!fileUrlRes) {
      message.error('文件地址获取失败，请重试！');
      return;
    }
    return resetProtocal(fileUrlRes, location.protocol);
  };

  const fileToFormData = (file, name, signatureRes) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('key', `${signatureRes.filePath}/${name}`);
    formData.append('policy', signatureRes.encodePolicy);
    formData.append('OSSAccessKeyId', signatureRes.oSSAccessKeyId);
    formData.append('success_action_status', 200);
    formData.append('signature', signatureRes.signature);
    formData.append('file', file);
    return formData;
  };

  const handleUploadFn = async ({
    file, success, progress, error
  }) => {
    const url = await upload(file, progress, error);
    await success({
      url
    });
  };

  const handleValidateFn = (file) => {
    if (file.size > maxFile) {
      message.warning('文件大小限制在100 M以内！');
      return false;
    }
    return true;
  };

  const handleFocus = (isFocus) => {
    setIsFocus(isFocus);
  };

  return (
    <BraftEditor
      {...props}
      value={content}
      className={classnames('rich-text-editer', {
        'is-focused': isFocus
      })}
      onChange={handleEditorChange}
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      media={{ uploadFn: handleUploadFn, validateFn: handleValidateFn }}
      excludeControls={excludeControls}
    />
  );
};

export default Editor;
