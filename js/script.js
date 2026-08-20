(function () {
    'use strict';

    var sections = document.querySelectorAll('section.editor-file');
    var tabs = document.querySelectorAll('.tab');
    var treeLinks = document.querySelectorAll('.tree-link');
    var viewItems = document.querySelectorAll('.menu-item[data-scroll]');
    var titleBarText = document.getElementById('titleBarText');
    var clockEl = document.getElementById('statusClock');
    var scrollProgress = document.getElementById('scrollProgress');
    var explorerToggle = document.getElementById('explorerToggle');
    var editorArea = document.querySelector('.editor-area');
    var tabStrip = document.getElementById('tabStrip');
    var activeFileId = 'about';

    function fillLines(file) {
        if (!editorArea || !file) return;
        var spacer = file.querySelector('.line-filler');
        if (!spacer) {
            spacer = document.createElement('div');
            spacer.className = 'line-filler';
            file.appendChild(spacer);
        }
        spacer.innerHTML = '';
        var headerH = tabStrip ? tabStrip.offsetHeight : 0;
        var contentH = file.offsetHeight;
        var available = (editorArea.clientHeight - headerH) - contentH;
        var count = Math.max(0, Math.floor(available / 21));
        var frag = document.createDocumentFragment();
        for (var i = 0; i < count; i++) {
            var row = document.createElement('div');
            row.className = 'code-line';
            var ln = document.createElement('span');
            ln.className = 'ln';
            row.appendChild(ln);
            frag.appendChild(row);
        }
        spacer.appendChild(frag);
    }

    function activateFile(id, scroll) {
        if (!document.getElementById(id)) return;

        sections.forEach(function (s) {
            s.classList.toggle('active', s.id === id);
        });
        tabs.forEach(function (t) {
            t.classList.toggle('active', t.getAttribute('href') === '#' + id);
        });
        treeLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });

        var fileName = (id === 'sideprojects') ? 'SideProjects.cs' : (id === 'photogallery') ? 'photoGallery.json' : id.charAt(0).toUpperCase() + id.slice(1) + '.cs';
        if (titleBarText) {
            titleBarText.textContent = fileName + ' - Yugesh Raj Shilakar';
        }

        if (scroll) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (editorArea) {
            editorArea.scrollTop = 0;
        }

        activeFileId = id;
        fillLines(document.getElementById(id));

        document.body.classList.remove('explorer-open');
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            activateFile(tab.getAttribute('href').slice(1), true);
        });
    });

    treeLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            activateFile(link.getAttribute('href').slice(1), true);
        });
    });

    viewItems.forEach(function (item) {
        item.addEventListener('click', function () {
            activateFile(item.getAttribute('data-scroll'), true);
        });
    });

    if (explorerToggle) {
        explorerToggle.addEventListener('click', function () {
            document.body.classList.toggle('explorer-open');
        });
    }

    var ideBody = document.querySelector('.ide-body');
    if (ideBody) {
        ideBody.addEventListener('click', function (e) {
            if (document.body.classList.contains('explorer-open') && !e.target.closest('.side-panel')) {
                document.body.classList.remove('explorer-open');
            }
        });
    }

    var propsToggle = document.getElementById('propsToggle');
    var propertiesPanel = document.getElementById('propertiesPanel');

    function setPropsCollapsed(collapsed) {
        if (!propertiesPanel) return;
        propertiesPanel.classList.toggle('collapsed', collapsed);
        if (propsToggle) {
            propsToggle.setAttribute('aria-expanded', String(!collapsed));
            propsToggle.title = collapsed ? 'Show Properties' : 'Auto Hide';
        }
    }

    if (propsToggle) {
        propsToggle.addEventListener('click', function () {
            setPropsCollapsed(!propertiesPanel.classList.contains('collapsed'));
        });
    }

    if (propertiesPanel) {
        propertiesPanel.querySelector('.panel-rail').addEventListener('click', function () {
            setPropsCollapsed(false);
        });
    }

    function updateClock() {
        if (!clockEl) return;
        var now = new Date();
        var h = String(now.getHours()).padStart(2, '0');
        var m = String(now.getMinutes()).padStart(2, '0');
        var s = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = h + ':' + m + ':' + s;
    }
    updateClock();
    setInterval(updateClock, 1000);

    function onScroll() {
        if (!editorArea || !scrollProgress) return;
        var max = editorArea.scrollHeight - editorArea.clientHeight;
        var progress = max > 0 ? (editorArea.scrollTop / max) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    if (editorArea) {
        editorArea.addEventListener('scroll', onScroll, { passive: true });
    }
    onScroll();

    window.addEventListener('resize', function () {
        fillLines(document.getElementById(activeFileId));
    });
    fillLines(document.getElementById(activeFileId));
})();