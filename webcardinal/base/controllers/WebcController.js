import Controller, { proxifyModelProperty } from './Controller';

export default class WebcController extends Controller {
  constructor(...props) {
    super(...props);
  }

  showModal(content, title, onConfirm, onClose, props = {}) {
    title = title ? title : 'Info';
    return this.createWebcModal({
      ...props,
      modalTitle: title,
      modalContent: content,
      onConfirm,
      onClose,
    });
  }

  showModalFromTemplate(template, onConfirm, onClose, props = {}) {
    return this.createWebcModal({
      ...props,
      template,
      onConfirm,
      onClose,
    });
  }

  showErrorModal(error, title, onConfirm, onClose, props = {}) {
    title = title ? title : 'Error';
    let text;

    if (error instanceof Error) {
      text = error.message;
    } else if (typeof error === 'object') {
      text = error.toString();
    } else {
      text = error;
    }

    return this.createWebcModal({
      disableClosing: true,
      showCancelButton: false,
      ...props,
      modalTitle: title,
      modalContent: text,
      onConfirm,
      onClose,
    });
  }

  showErrorModalAndRedirect(error, title, url, timeout, props = {}) {
    title = title ? title : 'Error';
    let text;

    if (error instanceof Error) {
      text = error.message;
    } else if (typeof error === 'object') {
      text = error.toString();
    } else {
      text = error;
    }

    if (!timeout) {
      timeout = 5000;
    }

    this.createWebcModal({
      disableExpanding: true,
      disableClosing: true,
      disableFooter: true,
      ...props,
      modalTitle: title,
      modalContent: text,
    });

    setTimeout(() => {
      this.hideModal();

      if (typeof url === 'string') {
        this.navigateToUrl(url);
      } else if (typeof url === 'object') {
        const { href, tag, state } = url;
        if (tag) {
          this.navigateToPageTag(tag, state);
        } else {
          this.navigateToUrl(href, state);
        }
      }
    }, timeout);
  }

  createWebcModal({
    template,
    controller,
    model,
    translationModel,
    modalTitle,
    modalDescription,
    modalContent,
    modalFooter,
    confirmButtonText,
    cancelButtonText,
    centered,
    expanded,
    disableCancelButton,
    disableClosing,
    disableBackdropClosing,
    disableExpanding,
    disableFooter,
    autoShow,
    onConfirm,
    onClose,
    ...rest
  }) {
    if (!onClose) {
      onClose = onConfirm;
    }

    if (model) {
      model = proxifyModelProperty(model);
    }

    const modal = this.createAndAddElement('webc-modal', {
      template,
      controller,
      model,
      translationModel,
      modalTitle,
      modalDescription,
      modalContent,
      modalFooter,
      confirmButtonText,
      cancelButtonText,
      centered,
      expanded,
      disableCancelButton,
      disableClosing,
      disableBackdropClosing,
      disableExpanding,
      disableFooter,
      autoShow,
      ...rest
    });

    modal.addEventListener('confirmed', e => {
      onConfirm && onConfirm(e);
      modal.remove();
    });
    modal.addEventListener('closed', e => {
      onClose && onClose(e);
      modal.remove();
    });

    return modal;
  }

  hideModal() {
    if (this.element.hasAttribute('data-modal')) {
      this.element.parentNode.host.remove();
      return;
    }

    this.element.querySelectorAll('webc-modal').forEach(modal => modal.remove());
  }
}
