class Print {
  constructor() {
    this.printNode = null; // 打印主体
    this.rootNode = null; // 包含
    this.iContentDocument = null;
    this.iContentWindow = null;
    this.elemAttrs = [];
  }

    // 获取层级class
    getElementClass = (currentElement, rootNode) => {
      // 递归结束条件
      if (currentElement.nodeName.toLocaleLowerCase() === 'body') {
        return true;
      }
      console.log(currentElement === rootNode);

      if (currentElement && (currentElement === rootNode)) {
        console.log(currentElement.id, rootNode.id);
        console.log(currentElement === rootNode);
        this.elemAttrs.push({
          elementName: currentElement.nodeName.toLocaleLowerCase(),
          className: currentElement.className,
          id: currentElement.id
        });
        return true;
      }
      this.elemAttrs.push({
        elementName: currentElement.nodeName.toLocaleLowerCase(),
        className: currentElement.className,
        id: currentElement.id
      });
      return this.getElementClass(currentElement.parentNode, rootNode);
    };

    createIframe = () => {
      const doc = document;
      const iframe = this.iframe = doc.createElement('iframe');
      iframe.width = `${1000}px`;
      iframe.height = `${1000}px`;
      iframe.src = `${location.protocol}//${location.host}/print.html`;
      iframe.style.cssText = 'position: absolute; left: -9999px;top: -9999px';
      doc.body.appendChild(iframe);
      iframe.onload = () => {
        this.iContentDocument = iframe.contentDocument;
        this.iContentWindow = iframe.contentWindow;
        this.handleWriteDocument();
      };
    };

    remove = () => {
      if (this.iframe) {
        document.body.removeChild(this.iframe);
      }
    };

    getChildrenElemnt = (node) => {
      let childrenNode = node.getElementsByTagName('*');
      childrenNode = Array.prototype.slice.apply(childrenNode);
      return childrenNode.filter((item) => item.parentNode === node);
    };

    // 获取css文件
    getPageLinkUrl = () => Array.prototype.slice.apply(document.getElementsByTagName('link')).map((item) => item.href);

    // 资源写入iframe
    handleWriteDocument = () => {
      const links = this.getPageLinkUrl();
      const linkLoadAll = [];
      links.filter((item) => item.indexOf('iphone.ico') < 0).forEach((item) => {
        linkLoadAll.push(new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.href = item;
          link.rel = 'stylesheet';
          this.iContentDocument.head.appendChild(link);
          link.onload = () => {
            resolve(true);
          };
        }));
      });
      Promise.all(linkLoadAll).then((res) => {
        console.log(res);
        this.handleLoadEvent();
      });
    };

    handleLoadEvent = () => {
      const printElement = this.printNode.nodeType ? this.printNode : document.body;
      const rootElement = this.rootNode.nodeType ? this.rootNode : document.body;
      this.getElementClass(printElement, rootElement);

      const oFragmeng = document.createDocumentFragment();
      let parent = oFragmeng;
      this.elemAttrs.reverse().forEach((item) => {
        const elem = this.iContentDocument.createElement(item.elementName);
        elem.id = item.id;
        elem.className = item.className;
        parent.appendChild(elem);
        parent = elem;
      });

      const htmlStr = printElement.innerHTML;

      const bodyChildren = this.getChildrenElemnt(this.iContentDocument.body);
      bodyChildren.forEach((item) => {
        if (item.nodeName.toLocaleLowerCase() !== 'script') {
          // item.remove();
          this.iContentDocument.body.removeChild(item);
        }
      });

      if (this.elemAttrs.length) {
        parent.innerHTML = htmlStr;
      } else {
        const elem = this.iContentDocument.createElement('div');
        elem.innerHTML = htmlStr;
        parent.appendChild(elem);
      }
      this.iContentDocument.body.appendChild(oFragmeng);
      this.iContentWindow.print();
      this.remove();
    };

    output = (obj = {}) => {
      this.printNode = obj.printNode;
      this.rootNode = obj.rootNode;
      this.createIframe();
    }
}

export default Print;
