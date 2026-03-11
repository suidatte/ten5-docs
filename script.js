(function () {
  'use strict';

  /* モバイルメニュー開閉 */
  var menuBtn = document.querySelector('.header__menu-btn');
  var mobileNav = document.getElementById('nav-menu');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.getAttribute('aria-hidden') !== 'true';
      mobileNav.classList.toggle('is-open', !open);
      mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    mobileNav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
      });
    });
  }

  /* スクロール時ヘッダー背景を濃くする */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 利用規約・プライバシーポリシー両方に同意した場合のみ招待ボタンを有効化 */
  function setupInviteButton(agreeTermsEl, agreePrivacyEl, inviteBtnEl) {
    if (!agreeTermsEl || !agreePrivacyEl || !inviteBtnEl) return;
    function update() {
      var both = agreeTermsEl.checked && agreePrivacyEl.checked;
      inviteBtnEl.setAttribute('aria-disabled', both ? 'false' : 'true');
      inviteBtnEl.setAttribute('tabindex', both ? '0' : '-1');
    }
    inviteBtnEl.addEventListener('click', function (e) {
      if (inviteBtnEl.getAttribute('aria-disabled') === 'true') e.preventDefault();
    });
    agreeTermsEl.addEventListener('change', update);
    agreePrivacyEl.addEventListener('change', update);
    update();
  }
  setupInviteButton(
    document.getElementById('agree-terms-modal'),
    document.getElementById('agree-privacy-modal'),
    document.getElementById('invite-btn-modal')
  );
  /* ヒーロー：1つのチェックボックスで招待ボタン有効化 */
  setupInviteButton(
    document.getElementById('agree-hero'),
    document.getElementById('agree-hero'),
    document.getElementById('invite-btn-hero')
  );

  /* 招待モーダル：ヘッダー「招待する」クリックで表示 */
  var inviteModal = document.getElementById('invite-modal');
  var inviteModalTriggers = document.querySelectorAll('[data-invite-modal]');
  var modalCloseBtns = document.querySelectorAll('[data-modal-close]');
  function openInviteModal() {
    if (!inviteModal) return;
    inviteModal.classList.add('is-open');
    inviteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = inviteModal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
  }
  function closeInviteModal() {
    if (!inviteModal) return;
    inviteModal.classList.remove('is-open');
    inviteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (inviteModal) {
    inviteModalTriggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openInviteModal();
      });
    });
    modalCloseBtns.forEach(function (el) {
      el.addEventListener('click', closeInviteModal);
    });
    inviteModal.querySelector('.modal__backdrop').addEventListener('click', closeInviteModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && inviteModal.classList.contains('is-open')) closeInviteModal();
    });
  }

  /* 軽いフェードイン（ヒーローは常に表示。セクションのみアニメーション） */
  var observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0 }) : null;
  if (observer) {
    document.querySelectorAll('.section__title, .section__body').forEach(function (el) {
      observer.observe(el);
    });
  }
})();
