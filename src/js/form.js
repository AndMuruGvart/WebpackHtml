import { checkFrom } from './validate';
import { apiSubmit } from './apiSubmit';

export const formValidation = () => {
    class Modal {
        constructor(modal, target, content) {
            this.isOpen = false;
            this.content = content;
            this.modal = modal;
            this.target = target;
            this.closeModal = modal.querySelectorAll('[data-close="close"]');

            this.target.addEventListener('click', (e) => {
                if (this.isOpen) {
                    return this.close();
                }
                if (this.modal.classList.contains('modal-main')) { return this.open(); }
            });

            this.modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) return this.close();
            });

            this.closeModal.forEach(item => {
                item.addEventListener('click', (e) => {
                    this.close();
                });
            });
        }

        open() {
            this.modal.classList.add('modal--open');
            setTimeout(() => {
                this.animateIn();
            }, 10);
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
        }

        close() {
            this.animateOut();
            setTimeout(() => {
                this.modal.classList.remove('modal--open');
            }, 250);
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        }

        animateIn() {
            this.content.classList.add('modal__content--open');
        }

        animateOut() {
            this.content.classList.remove('modal__content--open');
        }
    }

    const modal = new Modal(
        document.querySelector('.modal-main'),
        document.querySelector('[data-toggle="modal"]'),
        document.querySelector('.modal__content')
    );

    const form = document.getElementById('form');

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const result = checkFrom();
        if (result) {
            modal.close();
            const sendFormFakeApi = await apiSubmit();
            console.log(sendFormFakeApi);

            if (sendFormFakeApi === 200) {
                const modalSuccess = new Modal(
                    document.querySelector('.modal-success'),
                    document.querySelector('[data-toggle="modal"]'),
                    document.querySelector('.message--success')
                );
                modalSuccess.open();
            } else {
                const modalError = new Modal(
                    document.querySelector('.modal-error'),
                    document.querySelector('[data-toggle="modal"]'),
                    document.querySelector('.message--error')
                );
                modalError.open();
            }
            document.getElementById('your_name').value = '';
            document.getElementById('your_email').value = '';
            document.getElementById('your_message').value = '';
        }
    });
};
