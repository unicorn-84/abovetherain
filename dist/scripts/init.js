import ssm from 'simplestatemanager';

export default {
  initialize() {
    ssm.addStates([
      {
        id: 'device-xs',
        query: '(max-width: 575px)',
        onEnter() {
          document.body.classList.add('device-xs');
        },
        onLeave() {
          document.body.classList.remove('device-xs');
        },
      },
      {
        id: 'device-sm',
        query: '(min-width: 576px) and (max-width: 767px)',
        onEnter() {
          document.body.classList.add('device-sm');
        },
        onLeave() {
          document.body.classList.remove('device-sm');
        },
      },
      {
        id: 'device-md',
        query: '(min-width: 768px) and (max-width: 991px)',
        onEnter() {
          document.body.classList.add('device-md');
        },
        onLeave() {
          document.body.classList.remove('device-md');
        },
      },
      {
        id: 'device-lg',
        query: '(min-width: 992px) and (max-width: 1199px)',
        onEnter() {
          document.body.classList.add('device-lg');
        },
        onLeave() {
          document.body.classList.remove('device-lg');
        },
      },
      {
        id: 'device-xl',
        query: 'screen and (min-width: 1200px)',
        onEnter() {
          document.body.classList.add('device-xl');
        },
        onLeave() {
          document.body.classList.remove('device-xl');
        },
      },
    ]);
  },
};
