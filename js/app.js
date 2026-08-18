function update() {
        const scrollPos = {};
        document.querySelectorAll('[data-scroll-id]').forEach(el => {
            scrollPos[el.getAttribute('data-scroll-id')] = { top: el.scrollTop, left: el.scrollLeft };
        });
        render();
        document.querySelectorAll('[data-scroll-id]').forEach(el => {
            const key = el.getAttribute('data-scroll-id');
            if (scrollPos[key] !== undefined) {
                el.scrollTop = scrollPos[key].top;
                el.scrollLeft = scrollPos[key].left;
            }
        });
    }

    const TELEMETRY_LOG_TEMPLATES = [
        () => `SYNCHRONIZING WITH CRYSTALLINE SUBSYSTEM 0x${Math.floor(Math.random()*16).toString(16).toUpperCase().padStart(2,'0')}... OK`,
        () => `PHOTONIC ARRAY CALIBRATION CYCLE COMPLETE`,
        () => `RELAY HANDSHAKE - ${['ICELAND STATION','NEWFOUNDLAND HUB','SCOTLAND BASE','STREYMOY HQ'][Math.floor(Math.random()*4)]}... OK`,
        () => `ANALOG BUFFER BANK ${Math.ceil(Math.random()*12)} WITHIN TOLERANCE`,
        () => `DETECTED BACKGROUND ANOMALOUS RADIATION IN SECTOR ${Math.ceil(Math.random()*6)}`,
        () => `CRYSTALLINE LATTICE RESONANCE DRIFT: ${(Math.random()*0.4).toFixed(2)}Hz - WITHIN TOLERANCE`,
        () => `THERMAL LOAD CHECK, RESEARCH CORE... NOMINAL`,
        () => `RIFT TELEMETRY FEED HEARTBEAT RECEIVED`,
        () => `WARNING: TRANSIENT LATENCY SPIKE ON NORTH ATLANTIC RELAY`,
        () => `ARCHIVE INDEX CHECKSUM VERIFIED`
    ];

    function jitter(value, range, min, max) {
        return Math.max(min, Math.min(max, value + (Math.random() - 0.5) * range));
    }

    function telemetryTick() {
        if (!state.loggedIn || !state.booted) return;
        const ts = state.telemetryStats;
        ts.processor = jitter(ts.processor, 2.4, 78, 99.5);
        ts.resonance = jitter(ts.resonance, 3, 70, 99);
        ts.relay = jitter(ts.relay, 5, 55, 98);

        const line = TELEMETRY_LOG_TEMPLATES[Math.floor(Math.random() * TELEMETRY_LOG_TEMPLATES.length)]();
        const stamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        state.telemetryLog.unshift(`[${stamp}] ${line}`);
        if (state.telemetryLog.length > 24) state.telemetryLog.length = 24;

        update();
    }
    setInterval(telemetryTick, 3500);

    function bringToFront(id) {
        const win = state.windows.find(w => w.id === id);
        if (win && win.zIndex < state.highestZ) {
            state.highestZ++;
            win.zIndex = state.highestZ;
            update();
        }
    }

    function isMobileViewport() {
        return window.innerWidth < 768;
    }

    function toggleWindow(id) {
        const win = state.windows.find(w => w.id === id);
        if (win) {
            win.open = !win.open;
            if (!win.open && id === 'anomaly-an5001') stopAllCassettes();
            if (win.open && isMobileViewport()) win.maximized = true;
            if (win.open) bringToFront(id);
            else update();
        }
    }

    document.addEventListener('mousemove', (e) => {
        if (state.resizeState) {
            const win = state.windows.find(w => w.id === state.resizeState.id);
            if (!win || win.maximized) return;
            const dx = e.clientX - state.resizeState.startX;
            const dy = e.clientY - state.resizeState.startY;
            const el = document.getElementById(`win-${win.id}`);
            if (el) {
                win.w = Math.max(340, state.resizeState.initW + dx);
                win.h = Math.max(240, state.resizeState.initH + dy);
                el.style.width = `${win.w}px`;
                el.style.height = `${win.h}px`;
            }
            return;
        }
        if (!state.dragState) return;
        const win = state.windows.find(w => w.id === state.dragState.id);
        if (!win || win.maximized) return;

        const dx = e.clientX - state.dragState.startX;
        const dy = e.clientY - state.dragState.startY;
        
        const el = document.getElementById(`win-${win.id}`);
        if (el) {
            win.x = Math.max(0, state.dragState.initWinX + dx);
            win.y = Math.max(0, state.dragState.initWinY + dy);
            el.style.left = `${win.x}px`;
            el.style.top = `${win.y}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (state.dragState) state.dragState = null;
        if (state.resizeState) state.resizeState = null;
    });

    window.startDrag = function(e, id) {
        if (e.target.closest('.win-controls')) return;
        bringToFront(id);
        if (isMobileViewport()) return;
        const win = state.windows.find(w => w.id === id);
        if (win.maximized) return;
        state.dragState = { id, startX: e.clientX, startY: e.clientY, initWinX: win.x, initWinY: win.y };
    };

    window.startResize = function(e, id) {
        e.stopPropagation();
        e.preventDefault();
        if (isMobileViewport()) return;
        bringToFront(id);
        const win = state.windows.find(w => w.id === id);
        if (!win || win.maximized) return;
        state.resizeState = { id, startX: e.clientX, startY: e.clientY, initW: win.w, initH: win.h };
    };

    function render() {
        const root = document.getElementById('app-root');
        
        if (!state.booted) {
            root.innerHTML = renderBoot();
            return;
        }
        
        if (!state.loggedIn) {
            root.innerHTML = renderLogin();
            return;
        }

        root.innerHTML = `
            ${renderDesktop()}
            ${state.windows.filter(w => w.open).map(renderWindow).join('')}
            ${renderTaskbar()}
            ${renderDecryptPanel()}
        `;
        lucide.createIcons();
    }

    function renderLogin() {
        return `
        <div class="w-full h-full flex flex-col items-center justify-center relative">
            <div class="absolute inset-0 bg-[#001015] opacity-80 mix-blend-multiply"></div>
            <div class="relative z-10 tech-border bg-[var(--color-panel)] p-8 max-w-md w-full flex flex-col items-center shadow-[0_0_50px_rgba(0,229,255,0.1)]">
                <div class="mb-4" style="width: 64px; height: 64px; background-color: #00e5ff; -webkit-mask-image: url('images/Median Logo.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url('images/Median Logo.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; filter: drop-shadow(0 0 5px rgba(0,229,255,0.5)) drop-shadow(0 0 15px rgba(0,229,255,0.2));"></div>
                <h1 class="text-3xl font-bold tracking-widest text-glow mb-1">MERIDIAN</h1>
                <h2 class="text-xs tracking-[0.3em] text-[var(--color-text-dim)] mb-8">DIRECTORATE FOR ANOMALOUS RESEARCH</h2>
                <div class="w-full mb-6">
                    <label class="block text-xs font-mono-tech text-[var(--color-cyan-dim)] mb-2">AUTH_KEY</label>
                    <input type="text" id="login-input" class="w-full bg-[var(--color-bg)] border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] px-4 py-2 font-mono-tech focus:border-[var(--color-cyan)] transition-colors" style="-webkit-text-security:disc; text-security:disc;" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore data-bwignore onkeypress="if(event.key === 'Enter') attemptLogin()">
                </div>
                <button onclick="attemptLogin()" class="w-full border border-[var(--color-cyan)] text-[var(--color-cyan)] py-2 hover:bg-[var(--color-cyan)] hover:text-black transition-all font-bold tracking-wider font-mono-tech flex justify-center items-center gap-2">
                    <i data-lucide="unlock" class="w-4 h-4"></i> INITIALIZE SESSION
                </button>
                <div id="login-error" class="text-[var(--color-red)] text-xs mt-4 h-4 font-mono-tech uppercase"></div>
            </div>
            <div class="absolute bottom-4 text-[10px] text-[var(--color-text-dim)] font-mono-tech tracking-widest text-center w-full">
                UNAUTHORIZED ACCESS WILL RESULT IN IMMEDIATE SECURE FACILITY LOCKDOWN
            </div>
        </div>`;
    }

    window.attemptLogin = function() {
        const input = document.getElementById('login-input').value.trim().toUpperCase();
        if (input === 'MERIDIAN') {
            state.loggedIn = true;
            update();
        } else {
            document.getElementById('login-error').innerText = 'ERROR: INVALID AUTH_KEY. ACCESS DENIED.';
            document.getElementById('login-input').value = '';
            setTimeout(() => {
                const err = document.getElementById('login-error');
                if (err) err.innerText = '';
            }, 3000);
        }
    };

    function renderBoot() {
        setTimeout(() => { state.booted = true; update(); }, 2000);
        return `
        <div class="w-full h-full bg-black p-8 font-mono-tech text-[var(--color-cyan-dim)] flex flex-col justify-end text-sm leading-relaxed">
            <div>MERIDIAN BIOS v4.2.1</div>
            <div>INITIALIZING PHOTONIC PROCESSOR ARRAY... OK</div>
            <div>LOADING CRYSTALLINE DATA SUBSYSTEMS... OK</div>
            <div>CHECKING RIFT TELEMETRY FEEDS... CONNECTED</div>
            <div>DECRYPTING ANALOG HARDWARE BUFFERS... OK</div>
            <div class="text-[var(--color-cyan)] animate-pulse mt-4">AWAITING SECURE LOGIN...</div>
        </div>`;
    }

    function renderDesktop() {
        return `
        <div class="absolute inset-0 p-3 pt-6 md:p-4 md:pt-8 flex flex-row md:flex-col flex-wrap gap-4 md:gap-6 items-start content-start z-0 overflow-y-auto pb-16" data-scroll-id="desktop-icons">
            ${state.windows.filter(w => !w.hidden).map(w => `
                <div class="flex flex-col items-center gap-2 cursor-pointer group w-20 md:w-24" onclick="toggleWindow('${w.id}')">
                    <div class="w-12 h-12 bg-[var(--color-panel)] border border-[var(--color-panel-border)] group-hover:border-[var(--color-cyan)] flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] tech-border">
                        <i data-lucide="${w.icon}" class="text-[var(--color-cyan-dim)] group-hover:text-[var(--color-cyan)] w-6 h-6"></i>
                    </div>
                    <span class="text-[10px] font-mono-tech text-center bg-black/50 px-1 border border-transparent group-hover:border-[var(--color-cyan-dim)] group-hover:text-[var(--color-cyan)] text-[var(--color-text-dim)]">${w.title}</span>
                </div>
            `).join('')}
            
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" style="width: 600px; height: 600px; background-color: #00e5ff; -webkit-mask-image: url('images/Median Logo.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url('images/Median Logo.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center;"></div>
        </div>`;
    }

    function renderTaskbar() {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        return `
        <div class="absolute bottom-0 w-full h-10 bg-[var(--color-panel)] border-t border-[var(--color-cyan-dim)] flex items-center justify-between px-2 md:px-4 z-50">
            <div class="flex items-center gap-2 md:gap-4 h-full overflow-x-auto min-w-0">
                <div class="flex items-center gap-2 text-[var(--color-cyan)] font-bold tracking-wider pr-2 md:pr-4 border-r border-[var(--color-panel-border)] h-full shrink-0">
                    <div style="width: 20px; height: 20px; background-color: #00e5ff; -webkit-mask-image: url('images/Median Logo.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url('images/Median Logo.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center;"></div>
                    <span class="hidden md:inline">MERIDIAN OS</span>
                </div>
                ${state.windows.filter(w => w.open).map(w => `
                    <div onclick="bringToFront('${w.id}')" class="px-2 md:px-3 py-1 bg-[var(--color-bg)] border border-[var(--color-cyan-dim)] text-[10px] font-mono-tech cursor-pointer hover:bg-[var(--color-cyan-dim)] hover:text-black transition-colors flex items-center gap-2 shrink-0">
                        <i data-lucide="${w.icon}" class="w-3 h-3"></i>
                        <span class="hidden md:inline">${w.title}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex items-center gap-3 md:gap-6 h-full text-[10px] font-mono-tech text-[var(--color-cyan-dim)] shrink-0">
                <button onclick="toggleDecryptPanel()" title="Local decryption - redactions are permanent" class="flex items-center gap-1.5 px-2 py-1 border border-[var(--color-panel-border)] text-[var(--color-text-dim)] hover:text-[var(--color-cyan)] transition-colors">
                    <i data-lucide="lock" class="w-3 h-3"></i>
                    <span class="hidden md:inline">SEALED</span>
                </button>
                <div class="hidden lg:flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse"></span>
                    STREYMOY HQ NETWORK
                </div>
                <div class="hidden sm:flex flex-col leading-tight border-l border-[var(--color-panel-border)] pl-4">
                    <span class="text-[var(--color-cyan)]">${state.user.name}</span>
                    <span>CLR: ${state.user.clearance}</span>
                </div>
                <div class="text-[var(--color-cyan)] font-bold text-sm bg-black px-2 py-1 border border-[var(--color-panel-border)]">
                    ${time}
                </div>
            </div>
        </div>`;
    }

    function renderWindow(win) {
        let content = '';
        switch(win.id) {
            case 'archive': content = renderArchiveApp(); break;
            case 'map': content = renderMapApp(); break;
            case 'ranks': content = renderRanksApp(); break;
            case 'dashboard': content = renderDashboardApp(); break;
            case 'messages': content = renderMessagesApp(); break;
            case 'registry': content = renderRegistryApp(); break;
            case 'anomaly-an5001': content = renderAnomalyAN5001(); break;
        }

        return `
        <div id="win-${win.id}" class="window ${win.maximized ? 'maximized' : ''}" style="left: ${win.x}px; top: ${win.y}px; width: ${win.w}px; height: ${win.h}px; z-index: ${win.zIndex};" onmousedown="bringToFront('${win.id}')">
            <div class="window-header h-10 md:h-8 flex items-center justify-between px-2 shrink-0 select-none" onmousedown="startDrag(event, '${win.id}')">
                <div class="flex items-center gap-2 text-[var(--color-cyan)] font-mono-tech text-xs font-bold min-w-0">
                    <i data-lucide="${win.icon}" class="w-4 h-4 shrink-0"></i>
                    <span class="truncate">${win.title}</span>
                </div>
                <div class="win-controls flex gap-1 shrink-0">
                    <button onclick="toggleMax('${win.id}')" class="hidden md:flex w-6 h-6 items-center justify-center text-[var(--color-cyan-dim)] hover:bg-[var(--color-cyan-dim)] hover:text-black border border-transparent hover:border-[var(--color-cyan)]">
                        <i data-lucide="square" class="w-3 h-3"></i>
                    </button>
                    <button onclick="toggleWindow('${win.id}')" class="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center text-[var(--color-cyan-dim)] hover:bg-[var(--color-red)] hover:text-black border border-transparent hover:border-[var(--color-red)]">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            <div class="flex-1 overflow-hidden relative bg-[var(--color-bg)]">
                <div class="absolute inset-0 pointer-events-none scanner-line"></div>
                ${content}
            </div>
            ${!win.maximized ? `<div class="resize-handle" onmousedown="startResize(event, '${win.id}')" title="Drag to resize"></div>` : ''}
        </div>`;
    }
    window.toggleMax = function(id) {
        const win = state.windows.find(w => w.id === id);
        win.maximized = !win.maximized;
        update();
    };


    function renderPlaque(rank, scale) {
        const tileHtml = (colors) => colors.map(c => `<div class="p-tile p-tile-${c}"></div>`).join('');
        const cylCount = rank.cylinders || 0;
        const cylLeft = Math.ceil(cylCount / 2);
        const cylRight = Math.floor(cylCount / 2);
        const cylClass = rank.tier === 1 ? 'cyl-red' : (rank.tier <= 4 ? '' : 'cyl-amber');
        const cylHtml = (n) => Array(n).fill(`<div class="code-cylinder ${cylClass}"></div>`).join('');
        const tileCount = Math.max((rank.plaqueTop || []).length, (rank.plaqueBottom || []).length);
        const approxWidth = (tileCount * 25) + (cylCount * 15) + 60;
        const maxScale = scale || 1;
        const fitScale = Math.min(maxScale, 260 / approxWidth) ;
        const finalScale = Math.max(0.55, Math.min(maxScale, fitScale));
        const scaleStyle = `transform: scale(${finalScale.toFixed(2)}); transform-origin: left center;`;

        if (!rank.plaqueTop || rank.plaqueTop.length === 0) {
            return `<div class="text-[9px] text-[var(--color-text-dim)] italic border border-dashed border-[var(--color-panel-border)] px-3 py-2 text-center">NO INSIGNIA<br/>AUTHORIZED</div>`;
        }

        return `
            <div class="plaque-container" style="${scaleStyle}">
                <div class="flex gap-1">${cylHtml(cylLeft)}</div>
                <div class="plaque-metal">
                    <div class="plaque-row">${tileHtml(rank.plaqueTop)}</div>
                    ${rank.plaqueBottom && rank.plaqueBottom.length ? `<div class="plaque-row">${tileHtml(rank.plaqueBottom)}</div>` : ''}
                </div>
                <div class="flex gap-1">${cylHtml(cylRight)}</div>
            </div>`;
    }

    const DB_DOSSIERS = {
        r2: {
            status: 'ACTIVE - IDENTITY SEALED',
            designation: 'EXECUTIVE DIRECTOR',
            body: 'Photographic and biometric records are withheld from this terminal at standing Council instruction. The current officeholder has served since <span class="redact" onclick="revealRedact(this)">2019, following the sudden resignation of their predecessor under circumstances that remain sealed even from most of the Council</span>.\n\nField movement is conducted exclusively under authenticated corporate personas; <span class="redact" onclick="revealRedact(this)">a standing double-blind protocol prevents the Executive Director\'s own close security detail from confirming which persona is genuine on a given day</span>. Fewer than five living people are cleared to know the Executive Director\'s legal identity, and <span class="redact" onclick="revealRedact(this)">at least one of those five is believed by Security & Information to be compromised, though no formal finding has been made</span>.\n\nThis file will be updated only by direct Council order.'
        }
    };

    function renderPersonnelDossier(rank) {
        const d = DB_DOSSIERS[rank.id];
        if (!d) return '';
        return `
        <div class="mb-8">
            <div class="text-[10px] text-[var(--color-red)] border-b border-[var(--color-red)] opacity-60 pb-1 mb-3 uppercase tracking-widest">Sealed Personnel Dossier</div>
            <div class="dossier-sheet">
                <div class="doc-stamp" style="top: 10px; right: 14px;">SEALED</div>
                <div class="flex justify-between items-start gap-4 pb-3 mb-3 border-b border-[#8a8377]">
                    <div class="flex-1 grid grid-cols-3 gap-3">
                        <div>
                            <div class="dossier-field-label">Clearance</div>
                            <div class="dossier-field-value">${rank.clearance}</div>
                        </div>
                        <div>
                            <div class="dossier-field-label">Designation</div>
                            <div class="dossier-field-value">${d.designation}</div>
                        </div>
                        <div>
                            <div class="dossier-field-label">Status</div>
                            <div class="dossier-field-value" style="font-size: 10px;">${d.status}</div>
                        </div>
                    </div>
                    <div class="dossier-photo shrink-0"></div>
                </div>
                <div class="text-[10px] uppercase tracking-widest mb-1" style="color:#55503f;">Special Handling</div>
                <div class="text-xs leading-relaxed mb-3 whitespace-pre-wrap">Access to this file is restricted to the Directorate Council and Security &amp; Information Division leadership. Sections rendered as solid black bars are permanently sealed at Council order - no clearance, code, or session decryption will ever unseal them from this terminal.</div>
                <div class="text-[10px] uppercase tracking-widest mb-1" style="color:#55503f;">Description</div>
                <div class="text-xs leading-relaxed whitespace-pre-wrap">${d.body}</div>
            </div>
        </div>`;
    }

    window.setRanksView = function(v) {
        state.ranksView = v;
        update();
    };

    function renderRanksTable() {
        const tiers = [1, 2, 3, 4, 5, 6, 7];
        const cellFor = (tier, dept) => DB_RANKS.find(r => r.tier === tier && r.department === dept);

        const headerCells = DB_RANK_DEPARTMENTS.map(d => `
            <th class="sticky top-0 z-10 bg-[var(--color-panel)] border border-[var(--color-panel-border)] px-2 py-2 text-[9px] uppercase tracking-widest text-[var(--color-cyan)] whitespace-nowrap min-w-[130px]">${d}</th>
        `).join('');

        const bodyRows = tiers.map(tier => {
            const bandRow = `
                <tr>
                    <td colspan="${DB_RANK_DEPARTMENTS.length + 1}" class="bg-[#12060a] border-y border-[var(--color-red)] border-opacity-40 px-3 py-1 text-[9px] tracking-[0.25em] text-[var(--color-red)] uppercase font-bold">
                        &bull; ${DB_TIER_LABELS[tier]}
                    </td>
                </tr>`;

            const dataRow = `
                <tr>
                    <td class="sticky left-0 bg-[var(--color-panel)] border border-[var(--color-panel-border)] px-2 py-2 text-[10px] font-bold text-[var(--color-amber)] whitespace-nowrap">TIER ${tier}</td>
                    ${DB_RANK_DEPARTMENTS.map(dept => {
                        const rank = cellFor(tier, dept);
                        if (!rank) {
                            return `<td class="border border-[var(--color-panel-border)] px-2 py-2 text-center text-[var(--color-panel-border)] text-xs">&mdash;</td>`;
                        }
                        const isSel = rank.id === state.selectedRank;
                        return `
                        <td onclick="state.selectedRank = '${rank.id}'; state.ranksView = 'list'; update()" class="border border-[var(--color-panel-border)] px-2 py-2 align-top cursor-pointer transition-colors ${isSel ? 'bg-[var(--color-panel-border)]' : 'hover:bg-[#0a151f]'}">
                            <div class="text-[10px] font-bold text-white leading-snug">${rank.title}</div>
                            <div class="text-[9px] text-[var(--color-cyan-dim)] mt-1 uppercase tracking-wide">Addr: <span class="text-[var(--color-amber)]">"${rank.address}"</span></div>
                        </td>`;
                    }).join('')}
                </tr>`;

            return bandRow + dataRow;
        }).join('');

        return `
        <div class="w-full h-full overflow-auto custom-scrollbar bg-black p-2 md:p-4" data-scroll-id="ranks-table">
            <table class="border-collapse w-full font-mono-tech text-white">
                <thead>
                    <tr>
                        <th class="sticky top-0 left-0 z-20 bg-[var(--color-panel)] border border-[var(--color-panel-border)] px-2 py-2 text-[9px] uppercase tracking-widest text-[var(--color-cyan)] min-w-[80px]">Tier</th>
                        ${headerCells}
                    </tr>
                </thead>
                <tbody>${bodyRows}</tbody>
            </table>
            <div class="text-[9px] text-[var(--color-text-dim)] mt-3 px-1">Tap any cell to open the full designation record in LIST view. "Addr" denotes the Addressing Protocol used when directly addressing personnel holding that designation.</div>
        </div>`;
    }

    function renderRanksApp() {
        const selected = DB_RANKS.find(r => r.id === state.selectedRank);

        const viewTabs = `
        <div class="flex items-center gap-2 px-2 py-1.5 bg-[var(--color-panel)] border-b border-[var(--color-panel-border)] shrink-0">
            <button onclick="setRanksView('list')" class="text-[9px] font-mono-tech uppercase tracking-widest px-3 py-1 border ${state.ranksView === 'list' ? 'border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)] bg-opacity-10' : 'border-[var(--color-panel-border)] text-[var(--color-text-dim)] hover:text-[var(--color-cyan)]'}">List View</button>
            <button onclick="setRanksView('table')" class="text-[9px] font-mono-tech uppercase tracking-widest px-3 py-1 border ${state.ranksView === 'table' ? 'border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)] bg-opacity-10' : 'border-[var(--color-panel-border)] text-[var(--color-text-dim)] hover:text-[var(--color-cyan)]'}">Chain of Command Table</button>
        </div>`;

        if (state.ranksView === 'table') {
            return `<div class="w-full h-full flex flex-col">${viewTabs}<div class="flex-1 min-h-0">${renderRanksTable()}</div></div>`;
        }

        let lastTier = null;
        const listHtml = DB_RANKS.map(rank => {
            const isSel = rank.id === state.selectedRank;
            let groupHeader = '';
            if (rank.tier !== lastTier) {
                lastTier = rank.tier;
                groupHeader = `<div class="px-3 pt-3 pb-1 text-[9px] text-[var(--color-amber)] opacity-70 tracking-[0.2em] uppercase font-mono-tech border-t border-[var(--color-panel-border)] mt-1">${DB_TIER_LABELS[rank.tier]}</div>`;
            }
            return `${groupHeader}
            <div onclick="state.selectedRank = '${rank.id}'; update()" class="px-3 py-2 mb-1 cursor-pointer flex gap-3 items-center border-l-4 ${isSel ? 'border-[var(--color-cyan)] bg-[var(--color-panel-border)]' : 'border-transparent hover:bg-[#0a151f] hover:border-[var(--color-cyan-dim)]'} transition-all group">
                <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[var(--color-cyan)] transition-colors truncate">${rank.title}</span>
                    <span class="text-[9px] text-[var(--color-text-dim)] uppercase font-mono-tech truncate">${rank.department}</span>
                </div>
            </div>`;
        }).join('');

        const detailHtml = selected ? `
            <div class="flex flex-col h-full bg-[#03070b] p-4 md:p-6 font-mono-tech border-l border-[var(--color-panel-border)] overflow-y-auto custom-scrollbar" data-scroll-id="ranks-detail">
                
                <div class="flex justify-between items-start border-b border-[var(--color-panel-border)] pb-4 mb-6">
                    <div>
                        <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase mb-1 tracking-widest">${DB_TIER_LABELS[selected.tier]}</div>
                        <h2 class="text-2xl md:text-3xl font-bold text-[var(--color-cyan)] static-glow uppercase tracking-widest">${selected.title}</h2>
                    </div>
                    <div class="text-right shrink-0 ml-4">
                        <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase mb-1 tracking-widest">Clearance Code</div>
                        <div class="text-lg font-bold border border-[var(--color-panel-border)] px-3 py-1 bg-black ${selected.clearance.startsWith('Omega') ? 'text-[var(--color-red)] red-glow border-[var(--color-red)]' : 'text-[var(--color-amber)] amber-glow'}">${selected.clearance}</div>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-8 mb-8">
                    
                    <div class="w-full lg:w-[320px] shrink-0 flex flex-col gap-2">
                        <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest text-center">Rank Plaque &amp; Code Cylinders</div>
                        <div class="min-h-[130px] bg-black border border-[var(--color-panel-border)] flex items-center justify-center p-4 relative shadow-[inset_0_0_20px_#000] overflow-hidden">
                            <div class="absolute inset-0 bg-grid opacity-30"></div>
                            <div class="relative z-10">${renderPlaque(selected, 1.15)}</div>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-[10px] text-center mt-2">
                            <div class="bg-[#0a1118] border border-[var(--color-panel-border)] p-1 text-[var(--color-text-dim)]">TIER: ${selected.tier}</div>
                            <div class="bg-[#0a1118] border border-[var(--color-panel-border)] p-1 text-[var(--color-text-dim)] truncate" title="${selected.department}">${selected.department}</div>
                        </div>
                        <div class="bg-black border border-[var(--color-amber)] border-opacity-40 p-2 mt-1 text-center">
                            <div class="text-[9px] text-[var(--color-amber)] opacity-80 uppercase tracking-widest mb-1">Addressing Protocol</div>
                            <div class="text-sm font-bold text-white uppercase tracking-wider">"${selected.address}"</div>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col gap-6 min-w-0">
                        <div>
                            <div class="text-[10px] text-[var(--color-cyan)] bg-[var(--color-panel-border)] px-2 py-1 uppercase mb-2 inline-block">Role & Directives</div>
                            <div class="text-sm text-[var(--color-text-dim)] leading-relaxed whitespace-pre-wrap">${selected.desc}</div>
                        </div>

                        <div>
                            <div class="text-[10px] text-[var(--color-cyan)] bg-[var(--color-panel-border)] px-2 py-1 uppercase mb-2 inline-block">Uniform Identifier</div>
                            <div class="text-sm text-[var(--color-text-dim)] leading-relaxed">${selected.uniform}</div>
                        </div>
                    </div>
                </div>

                ${renderPersonnelDossier(selected)}

                <div class="flex-1">
                    <div class="text-[10px] text-[var(--color-amber)] border-b border-[var(--color-amber)] opacity-50 pb-1 mb-3 uppercase tracking-widest">System & Command Privileges</div>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${selected.privileges.map(priv => `
                            <li class="flex items-start gap-2 text-xs text-white bg-[#060c12] border border-[#1a2c33] p-2">
                                <i data-lucide="check-circle" class="w-4 h-4 text-[var(--color-amber)] shrink-0"></i>
                                <span>${priv}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="mt-8 pt-2 flex justify-between text-[10px] text-[var(--color-cyan-dim)] border-t border-[var(--color-panel-border)]">
                    <span>DIRECTORATE SECURE PROTOCOL</span>
                    <span>AUTHORIZATION_REQ: VALID</span>
                </div>
            </div>
        ` : '';

        return `
        <div class="w-full h-full flex flex-col">
            ${viewTabs}
            <div class="flex-1 min-h-0 flex flex-col md:flex-row">
                <div class="w-full md:w-1/3 md:min-w-[250px] md:max-w-[300px] mobile-cap md:h-full overflow-y-auto bg-[#04080c] p-0 custom-scrollbar border-b md:border-b-0 md:border-r border-[var(--color-panel-border)]" data-scroll-id="ranks-list">
                    <div class="bg-[var(--color-panel)] p-4 border-b border-[var(--color-cyan-dim)] text-center sticky top-0 z-10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        <div class="text-xs text-[var(--color-cyan)] font-mono-tech tracking-widest font-bold">MERIDIAN HIERARCHY</div>
                        <div class="text-[9px] text-[var(--color-cyan-dim)] font-mono-tech mt-1">${DB_RANKS.length} DESIGNATIONS ON FILE</div>
                    </div>
                    <div class="p-2">
                        ${listHtml}
                    </div>
                </div>
                <div class="flex-1 min-h-0 overflow-hidden">
                    ${detailHtml}
                </div>
            </div>
        </div>`;
    }

    function findRoom(facilityId, roomName) {
        const fac = DB_FACILITIES[facilityId];
        if (!fac) return null;
        for (const lvl of fac.levels) {
            const room = lvl.rooms.find(r => r.name === roomName);
            if (room) return { room, level: lvl };
        }
        return null;
    }

    window.selectFacility = function(key) {
        state.activeFacility = key;
        state.activeRoom = null;
        update();
    };

    window.openRoom = function(name) {
        state.activeRoom = name;
        update();
    };

    window.closeRoom = function() {
        state.activeRoom = null;
        update();
    };

    function statusColorClass(status) {
        if (status === 'ACTIVE') return 'text-[var(--color-cyan)]';
        if (status === 'LOCKED') return 'text-[var(--color-amber)]';
        return 'text-[var(--color-red)]';
    }

    function renderMapApp() {
        const facility = DB_FACILITIES[state.activeFacility];
        const roomLookup = state.activeRoom ? findRoom(state.activeFacility, state.activeRoom) : null;

        const listHtml = Object.keys(DB_FACILITIES).map(key => {
            const fac = DB_FACILITIES[key];
            const isActive = state.activeFacility === key;
            return `
                <div onclick="selectFacility('${key}')" class="p-3 border-b border-[var(--color-panel-border)] cursor-pointer flex flex-col gap-1 transition-colors ${isActive ? 'bg-[var(--color-panel-border)] border-l-4 border-l-[var(--color-cyan)]' : 'border-l-4 border-l-transparent hover:bg-[#0a151f] hover:border-[var(--color-cyan-dim)]'}">
                    <div class="flex justify-between items-center text-[10px] font-mono-tech text-[var(--color-cyan-dim)]">
                        <span class="tracking-widest uppercase">${fac.shortName}</span>
                        <span class="w-2 h-2 rounded-full ${fac.status === 'ACTIVE' ? 'bg-[var(--color-cyan)]' : 'bg-[var(--color-amber)]'}"></span>
                    </div>
                    <div class="text-xs font-bold text-white truncate">${fac.name}</div>
                    <div class="text-[9px] text-[var(--color-text-dim)] truncate">${fac.location}</div>
                </div>
            `;
        }).join('');

        let overlayHtml = '';
        if (roomLookup) {
            const { room, level } = roomLookup;
            overlayHtml = `
            <div class="absolute inset-0 z-30 flex flex-col p-4 md:p-6 bg-[#03070b] font-mono-tech animate-[flicker_0.4s_ease-out]">
                <div class="flex justify-between items-center mb-4 border-b-2 border-[var(--color-cyan-dim)] pb-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="bg-[var(--color-cyan)] text-black font-bold px-2 py-1 text-[10px] uppercase shrink-0">Schematic</div>
                        <h3 class="font-bold text-[var(--color-cyan)] text-lg md:text-xl tracking-wider uppercase static-glow truncate">${room.name}</h3>
                    </div>
                    <button onclick="closeRoom()" class="shrink-0 ml-3 flex items-center gap-1 text-[10px] border border-[var(--color-cyan-dim)] px-3 py-1 hover:bg-[var(--color-cyan)] hover:text-black transition-colors">
                        <i data-lucide="arrow-left" class="w-3 h-3"></i> BACK
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-3 gap-6" data-scroll-id="map-room-overlay">
                    <div class="col-span-1 border border-[var(--color-panel-border)] bg-black relative p-4 flex flex-col items-center justify-center min-h-[180px]">
                        <div class="absolute top-2 left-2 text-[9px] text-[var(--color-cyan-dim)] opacity-60">SCHEMATIC_RENDER</div>
                        <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                        <div class="w-28 h-28 border-2 border-[var(--color-cyan-dim)] opacity-40 rotate-45 flex items-center justify-center relative">
                            <div class="absolute w-full h-[1px] bg-[var(--color-panel-border)] top-1/2 -translate-y-1/2"></div>
                            <div class="absolute h-full w-[1px] bg-[var(--color-panel-border)] left-1/2 -translate-x-1/2"></div>
                            <div class="w-14 h-14 border border-[var(--color-cyan-dim)] opacity-70"></div>
                            ${room.alert ? '<div class="absolute inset-0 bg-[var(--color-red)]/10 animate-pulse"></div>' : ''}
                        </div>
                        <div class="mt-6 w-full">
                            <div class="flex justify-between text-[9px] text-[var(--color-cyan-dim)] mb-1"><span>DEPTH</span><span>${level.depth}</span></div>
                            <div class="flex justify-between text-[9px] text-[var(--color-cyan-dim)] mb-1 mt-2"><span>PERSONNEL</span><span class="text-white">${room.personnel}</span></div>
                        </div>
                    </div>

                    <div class="col-span-1 md:col-span-2 flex flex-col gap-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="border border-[var(--color-panel-border)] bg-[var(--color-panel)] p-3">
                                <div class="text-[var(--color-cyan-dim)] text-[9px] font-bold uppercase mb-1">Operational Status</div>
                                <div class="text-lg font-mono font-bold ${statusColorClass(room.status)}">${room.status}</div>
                            </div>
                            <div class="border border-[var(--color-panel-border)] bg-[var(--color-panel)] p-3">
                                <div class="text-[var(--color-cyan-dim)] text-[9px] font-bold uppercase mb-1">Hazard Level</div>
                                <div class="text-lg font-mono font-bold ${room.hazard === 'NONE' ? 'text-white' : 'text-[var(--color-red)]'}">${room.hazard}</div>
                            </div>
                        </div>

                        <div class="border-l-2 border-[var(--color-cyan-dim)] pl-4 py-2 bg-black/40">
                            <div class="text-[var(--color-cyan-dim)] text-[9px] font-bold uppercase">Department Head</div>
                            <div class="text-white font-bold text-base">${room.head}</div>
                            <div class="text-[var(--color-text-dim)] text-xs mt-1 uppercase tracking-wider">[ ${room.dept} ]</div>
                        </div>

                        <div class="flex-1">
                            <div class="text-[var(--color-cyan-dim)] text-[10px] font-bold mb-2 border-b border-[var(--color-panel-border)] pb-1 uppercase">System Logs &amp; Description</div>
                            <div class="text-sm text-[var(--color-text-dim)] leading-relaxed">${room.desc}</div>
                        </div>

                        ${room.alert ? `
                        <div class="bg-[var(--color-red)]/10 border-l-4 border-[var(--color-red)] p-3">
                            <div class="text-[var(--color-red)] text-[10px] font-bold flex items-center gap-2">
                                <i data-lucide="alert-triangle" class="w-3 h-3"></i> ACTIVE ALERT
                            </div>
                            <div class="text-[var(--color-red)] text-xs mt-1 animate-flicker">${room.alert}</div>
                        </div>` : ''}

                        <div class="mt-auto pt-3 flex justify-between items-end border-t border-[var(--color-panel-border)] text-[10px] text-[var(--color-cyan-dim)]">
                            <span>LEVEL: ${level.label}</span>
                            <span>${facility.shortName}</span>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        const mainHtml = facility ? `
            <div class="flex-1 h-full relative overflow-hidden bg-[#03070b]">
                ${overlayHtml}
                <div class="h-full overflow-y-auto custom-scrollbar p-4 md:p-6" data-scroll-id="map-main">
                    <div class="border border-[var(--color-panel-border)] bg-[var(--color-panel)] p-4 mb-6 relative overflow-hidden">
                        <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-3">
                            <div>
                                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest">Structural Schematic</div>
                                <h2 class="text-2xl font-bold text-[var(--color-cyan)] static-glow tracking-widest uppercase">${facility.name}</h2>
                                <div class="text-xs text-[var(--color-text-dim)] mt-1">${facility.location} &bull; Established ${facility.established}</div>
                            </div>
                            <div class="flex gap-3 text-[10px] font-mono-tech">
                                <div class="bg-black border border-[var(--color-panel-border)] px-3 py-2 text-center">
                                    <div class="text-[var(--color-cyan-dim)]">STATUS</div>
                                    <div class="font-bold text-[var(--color-cyan)]">${facility.status}</div>
                                </div>
                                <div class="bg-black border border-[var(--color-panel-border)] px-3 py-2 text-center">
                                    <div class="text-[var(--color-cyan-dim)]">PERSONNEL</div>
                                    <div class="font-bold text-white">${facility.personnel}</div>
                                </div>
                            </div>
                        </div>
                        <div class="relative z-10 text-sm text-[var(--color-text-dim)] leading-relaxed mt-3 pt-3 border-t border-[var(--color-panel-border)]">${facility.desc}</div>
                    </div>

                    <div class="space-y-8">
                        ${facility.levels.map(level => `
                            <div class="relative pl-4 border-l-2 border-dashed border-[var(--color-panel-border)]">
                                <h3 class="text-xs text-[var(--color-cyan)] font-bold border-b border-[var(--color-panel-border)] mb-3 pb-1 flex justify-between font-mono-tech tracking-widest uppercase">
                                    <span>${level.label}</span>
                                    <span class="text-[var(--color-cyan-dim)]">${level.depth}</span>
                                </h3>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    ${level.rooms.map(room => `
                                        <button onclick="openRoom('${room.name.replace(/'/g, "\\'")}')" class="room-btn text-left ${room.alert ? 'room-alert' : ''}">
                                            <div class="flex justify-between items-start mb-2">
                                                <div class="text-[10px] font-bold text-white uppercase leading-tight pr-2">${room.name}</div>
                                                <i data-lucide="maximize-2" class="w-3 h-3 text-[var(--color-cyan-dim)] shrink-0"></i>
                                            </div>
                                            <div class="text-[9px] text-[var(--color-text-dim)] uppercase mb-1 truncate">${room.head}</div>
                                            <div class="text-[9px] font-bold ${statusColorClass(room.status)} ${room.alert ? 'animate-pulse' : ''}">${room.status}</div>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` : '<div class="flex-1 flex items-center justify-center text-[var(--color-panel-border)]"><i data-lucide="map" class="w-32 h-32 opacity-20"></i></div>';

        return `
        <div class="w-full h-full flex flex-col md:flex-row font-mono-tech bg-black">
            <div class="w-full md:w-64 md:shrink-0 flex flex-col bg-[#04080c] border-b md:border-b-0 md:border-r border-[var(--color-panel-border)]">
                <div class="bg-[var(--color-panel)] p-3 md:p-4 border-b border-[var(--color-cyan-dim)]">
                    <div class="text-xs text-[var(--color-cyan)] tracking-widest font-bold">FACILITY UPLINK</div>
                    <div class="text-[9px] text-[var(--color-cyan-dim)] mt-1">${Object.keys(DB_FACILITIES).length} HOLDINGS ON NETWORK</div>
                </div>
                <div class="max-h-[22vh] md:max-h-none md:flex-1 overflow-y-auto custom-scrollbar" data-scroll-id="map-sidebar">
                    ${listHtml}
                </div>
            </div>
            
            ${mainHtml}
        </div>`;
    }

    function renderRegistryApp() {
        return `
        <div class="w-full h-full flex flex-col bg-black p-4 font-mono-tech">
            <div class="flex items-center justify-between border-b-2 border-[var(--color-cyan-dim)] pb-2 mb-4 shrink-0">
                <div class="text-lg font-bold text-[var(--color-cyan)] static-glow flex items-center gap-2">
                    <i data-lucide="microscope" class="w-5 h-5"></i> ANOMALY REGISTRY SYSTEM
                </div>
                <div class="text-[10px] text-[var(--color-text-dim)] text-right">
                    PRIMARY DATABASE: STREYMOY<br>CLASSIFICATION STANDARD: COMMISSION LEGACY
                </div>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6" data-scroll-id="registry-list">
                ${DB_ANOMALIES.map(cls => `
                    <div class="tech-border bg-[var(--color-panel)] p-4">
                        <div class="flex justify-between items-end border-b border-[var(--color-panel-border)] pb-2 mb-4">
                            <h3 class="text-xl font-bold text-white uppercase tracking-widest ${cls.class === 'Class 5' || cls.class === 'Class 6' ? 'text-[var(--color-amber)]' : ''}">${cls.class}</h3>
                            <span class="text-xs text-[var(--color-cyan-dim)] bg-black px-2 py-1 border border-[var(--color-panel-border)]">LIMIT: ${cls.limit}</span>
                        </div>
                        
                        <div class="grid grid-cols-1 gap-4">
                            ${cls.items.length === 0 ? `
                                <div class="text-xs text-[var(--color-text-dim)] italic border border-dashed border-[var(--color-panel-border)] p-4 text-center">
                                    NO ANOMALIES CURRENTLY REGISTERED IN THIS CLASSIFICATION BRACKET.
                                </div>
                            ` : cls.items.map(item => `
                                <div ${item.file ? `onclick="openAnomalyFile('${item.file}')"` : ''} class="border-l-2 ${item.file ? 'border-[var(--color-amber)] cursor-pointer hover:bg-[var(--color-amber)] hover:bg-opacity-5 hover:border-[var(--color-cyan)]' : 'border-[var(--color-cyan-dim)]'} pl-4 py-1 flex flex-col gap-1 bg-black/30 transition-colors">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="flex items-center gap-2 min-w-0">
                                            <span class="text-xs font-bold text-[var(--color-cyan)] bg-[var(--color-panel-border)] px-1 shrink-0">${item.id}</span>
                                            <span class="text-sm font-bold text-white truncate">${item.name}</span>
                                        </div>
                                        ${item.file ? `<span class="text-[9px] text-[var(--color-amber)] uppercase tracking-widest flex items-center gap-1 shrink-0 animate-pulse"><i data-lucide="folder-open" class="w-3 h-3"></i> <span class="hidden sm:inline">Open File</span></span>` : ''}
                                    </div>
                                    <div class="text-xs text-[var(--color-text-dim)] leading-tight mt-1">${item.desc}</div>
                                    <div class="text-[10px] text-[var(--color-amber)] mt-1 flex items-start gap-1">
                                        <i data-lucide="box" class="w-3 h-3 mt-[1px]"></i> CONT: ${item.containment}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }


    function waveformBars(seed, count, isLive) {
        let bars = '';
        for (let i = 0; i < count; i++) {
            const h = 18 + Math.abs(Math.sin(seed * 0.013 + i * 0.7) + Math.sin(seed * 0.05 + i * 0.31)) * 42;
            let style = `height:${h.toFixed(0)}%; width:3px; background:var(--color-cyan-dim); opacity:0.55; flex-shrink:0;`;
            let cls = 'waveform-bar';
            if (isLive) {
                cls += ' is-live';
                const dur = (0.45 + Math.random() * 0.65).toFixed(2);
                const delay = (-(Math.random() * dur)).toFixed(2);
                style += ` animation-duration:${dur}s; animation-delay:${delay}s;`;
            }
            bars += `<div class="${cls}" style="${style}"></div>`;
        }
        return bars;
    }

    const AUDIO_LOG_LINES = {};

    function timeToSeconds(t) {
        const parts = String(t).split(':').map(Number);
        return (parts[0] || 0) * 60 + (parts[1] || 0);
    }

    function seedFromString(s) {
        let seed = 0;
        for (let i = 0; i < s.length; i++) seed += s.charCodeAt(i) * (i + 1);
        return seed;
    }

    const CASSETTE_SPIN_DURATION = 2.4; // must match @keyframes cassetteSpin duration below

    function cassetteSVG(seed, isPlaying) {
        const spokeAngles = [0, 60, 120, 180, 240, 300];
        const spinPhase = isPlaying ? `style="animation-delay:${(-(Date.now() / 1000 % CASSETTE_SPIN_DURATION)).toFixed(3)}s;"` : '';
        const reel = (cx) => `
            <g class="cassette-reel-group" ${spinPhase}>
                <circle class="cassette-hub" cx="${cx}" cy="70" r="15"></circle>
                ${spokeAngles.map(a => `<line class="cassette-spoke" x1="${cx}" y1="70" x2="${(cx + 14 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(70 + 14 * Math.sin(a * Math.PI / 180)).toFixed(1)}"></line>`).join('')}
            </g>`;
        const ticks = Array.from({ length: 14 }).map((_, i) => `<circle class="cassette-tick" cx="${58 + i * 14}" cy="164" r="1.6"></circle>`).join('');
        return `
        <svg class="cassette-shell ${isPlaying ? 'is-playing' : ''}" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">
            <rect class="cassette-frame" x="4" y="4" width="292" height="182" rx="10"></rect>
            <circle class="cassette-screw" cx="18" cy="18" r="4"></circle>
            <circle class="cassette-screw" cx="282" cy="18" r="4"></circle>
            <circle class="cassette-screw" cx="18" cy="172" r="4"></circle>
            <circle class="cassette-screw" cx="282" cy="172" r="4"></circle>
            <path class="cassette-tape-path" d="M 42 70 Q 150 42 258 70"></path>
            <path class="cassette-tape-path" d="M 42 70 Q 150 98 258 70"></path>
            <circle class="cassette-window" cx="98" cy="70" r="45"></circle>
            <circle class="cassette-window" cx="202" cy="70" r="45"></circle>
            ${reel(98)}
            ${reel(202)}
            <line class="cassette-label-line" x1="30" y1="128" x2="270" y2="128"></line>
            <line class="cassette-label-line" x1="30" y1="138" x2="270" y2="138"></line>
            <line class="cassette-label-line" x1="30" y1="148" x2="270" y2="148"></line>
            ${ticks}
        </svg>`;
    }

    function renderAudioLog(logId, opts) {
        AUDIO_LOG_LINES[logId] = opts.lines;
        const total = opts.lines.length;
        const isPlaying = !!state.anomalyLogsOpen[logId];
        const typing = state.anomalyLogsTyping[logId];
        const progress = Math.min(state.anomalyLogsProgress[logId] || 0, total);
        const started = progress > 0 || isPlaying || !!typing;
        const finished = progress >= total && !typing;
        const isWaiting = isPlaying && !typing && !finished;
        const seed = seedFromString(logId);

        const linesHtml = opts.lines.map((l, i) => {
            if (i < progress) {
                return `
                <div class="decode-line text-xs leading-snug">
                    <span class="text-[var(--color-cyan-dim)] font-mono-tech mr-2">[${l.time}]</span>
                    ${l.speaker ? `<span class="text-[var(--color-amber)] font-bold mr-1">${l.speaker}:</span>` : ''}
                    <span class="${l.speaker ? 'text-[var(--color-text-dim)]' : 'text-[var(--color-cyan-dim)] italic'}">${l.text}</span>
                </div>`;
            }
            if (typing && typing.line === i) {
                const shown = l.text.slice(0, typing.chars);
                return `
                <div class="decode-line-current text-xs leading-snug">
                    <span class="text-[var(--color-cyan-dim)] font-mono-tech mr-2">[${l.time}]</span>
                    ${l.speaker ? `<span class="text-[var(--color-amber)] font-bold mr-1">${l.speaker}:</span>` : ''}
                    <span class="${l.speaker ? 'text-white' : 'text-[var(--color-cyan)] italic'}">${shown}<span class="type-cursor">▍</span></span>
                </div>`;
            }
            const w = Math.min(92, Math.max(24, l.text.length * 2.1));
            return `<div class="cassette-lock-bar my-1.5" style="width:${w.toFixed(0)}%;" title="LOCKED - CANNOT SKIP AHEAD OF PLAYBACK" onclick="revealRedact(this)"></div>`;
        }).join('');

        const statusLabel = isPlaying ? 'PLAYING' : (finished ? 'STOPPED' : (started ? 'PAUSED' : 'STOPPED'));

        return `
        <div class="tech-border bg-black p-3 my-3">
            <div class="flex items-center justify-between mb-2 gap-2">
                <div class="min-w-0">
                    <div class="text-xs font-bold text-white truncate">${opts.title}</div>
                    <div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest truncate">${opts.subtitle}</div>
                </div>
                <div class="text-[9px] text-[var(--color-text-dim)] font-mono-tech shrink-0 text-right">
                    ${opts.duration}<br><span class="${isPlaying ? 'text-[var(--color-cyan)]' : ''}">${statusLabel}</span>
                </div>
            </div>
            <div class="cassette-unit my-2">
                ${cassetteSVG(seed, isPlaying)}
            </div>
            <div class="flex items-center justify-center gap-3 mb-2">
                <button onclick="toggleAnomalyLog('${logId}')" class="w-9 h-9 shrink-0 flex items-center justify-center border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-black transition-colors">
                    <i data-lucide="${isPlaying ? 'pause' : (finished ? 'rotate-ccw' : 'play')}" class="w-4 h-4"></i>
                </button>
                <div class="flex items-end gap-[2px] h-6 flex-1 max-w-[220px] overflow-hidden">${waveformBars(seed + progress * 7, 60, isPlaying)}</div>
            </div>
            <div class="border-t border-[var(--color-panel-border)] pt-2">
                <div class="flex items-center justify-between text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1.5">
                    <span>Transcript Log</span>
                    <span>${started ? `${progress} / ${total} LINES DECODED` : 'SIGNAL LOCKED'}</span>
                </div>
                ${started ? `
                <div class="cassette-log-box flex flex-col gap-0.5 h-32 sm:h-44 overflow-y-auto custom-scrollbar bg-[#010405] border border-[var(--color-panel-border)] p-2 pt-3" id="log-scroll-${logId}" data-scroll-id="cassette-log-${logId}">
                    ${linesHtml}
                </div>
                ${isWaiting ? `<div class="cassette-waiting text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mt-1.5 text-center">• • • signal continues • • •</div>` : ''}
                ` : `<div class="text-[9px] text-[var(--color-text-dim)] italic pt-1">TRANSCRIPT SEALED - PRESS PLAY TO BEGIN DECODING THE SUBTITLE TRACK. PLAYBACK CANNOT BE SKIPPED AHEAD.</div>`}
            </div>
        </div>`;
    }

    const AN5001_AUDIO_ID = 'an5001-log-4';
    const AN5001_SOURCE_FILE = 'audio/The Chordettes Lollipop (Featured In The Movie SMILE) (Remastered).mp3';
    let an5001Ctx = null, an5001Analyser = null;
    let an5001Live = null;
    let an5001RafId = null, an5001BeepTimer = null, an5001TickTimer = null;
    let an5001SourceBuffer = null;
    let an5001Volume = 0.8;

    function an5001MakeNoiseBuffer(ctx, seconds) {
        const len = Math.floor(ctx.sampleRate * seconds);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        return buf;
    }

    function an5001DistortionCurve(amount) {
        const n = 4096;
        const curve = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const x = i * 2 / n - 1;
            curve[i] = (1 + amount) * x / (1 + amount * Math.abs(x));
        }
        return curve;
    }

    function an5001HardClipCurve() {
        const n = 1024;
        const curve = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const x = i * 2 / n - 1;
            curve[i] = Math.max(-1, Math.min(1, x * 1.3));
        }
        return curve;
    }

    async function an5001LoadSourceBuffer(ctx) {
        if (an5001SourceBuffer) return an5001SourceBuffer;
        const resp = await fetch(AN5001_SOURCE_FILE);
        const arrayBuffer = await resp.arrayBuffer();
        an5001SourceBuffer = await ctx.decodeAudioData(arrayBuffer);
        return an5001SourceBuffer;
    }

    function an5001ExtractSlice(buffer, startSec, durSec, reverse) {
        const sr = buffer.sampleRate;
        const totalLen = buffer.length;
        let startSample = Math.floor(startSec * sr);
        let lenSamples = Math.floor(durSec * sr);
        if (startSample < 0) { lenSamples += startSample; startSample = 0; }
        if (startSample >= totalLen || lenSamples <= 4) return null;
        if (startSample + lenSamples > totalLen) lenSamples = totalLen - startSample;
        if (lenSamples <= 4) return null;
        const out = an5001Ctx.createBuffer(buffer.numberOfChannels, lenSamples, sr);
        for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
            const srcData = buffer.getChannelData(ch);
            const dstData = out.getChannelData(ch);
            for (let i = 0; i < lenSamples; i++) {
                dstData[i] = reverse ? srcData[startSample + lenSamples - 1 - i] : srcData[startSample + i];
            }
        }
        return out;
    }

    function an5001MakeBitcrusher(ctx, crushState) {
        const bufferSize = 4096;
        const node = ctx.createScriptProcessor(bufferSize, 2, 2);
        const holdVal = [0, 0];
        node.onaudioprocess = function(e) {
            const chCount = e.inputBuffer.numberOfChannels;
            const inL = e.inputBuffer.getChannelData(0);
            const inR = chCount > 1 ? e.inputBuffer.getChannelData(1) : inL;
            const outL = e.outputBuffer.getChannelData(0);
            const outR = e.outputBuffer.getChannelData(1);
            const bits = Math.max(2, Math.min(16, crushState.bitDepth));
            const step = Math.pow(0.5, bits - 1);
            const hold = Math.max(1, Math.round(crushState.holdFactor));
            for (let i = 0; i < bufferSize; i++) {
                if (i % hold === 0) { holdVal[0] = inL[i]; holdVal[1] = inR[i]; }
                let l = holdVal[0], r = holdVal[1];
                if (bits < 16) { l = Math.round(l / step) * step; r = Math.round(r / step) * step; }
                outL[i] = l; outR[i] = r;
            }
        };
        return node;
    }

    async function an5001BuildGraph(ctx) {
        const master = ctx.createGain();
        master.gain.value = 0;
        const volumeGain = ctx.createGain();
        volumeGain.gain.value = an5001Volume;
        master.connect(volumeGain);
        volumeGain.connect(ctx.destination);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        master.connect(analyser);

        const buffer = await an5001LoadSourceBuffer(ctx);
        const now = ctx.currentTime;
        const nodes = [];

        const wow = ctx.createOscillator(); wow.type = 'sine'; wow.frequency.value = 0.27;
        const wowGain = ctx.createGain(); wowGain.gain.value = 15;
        wow.connect(wowGain);
        const flutter = ctx.createOscillator(); flutter.type = 'sine'; flutter.frequency.value = 6.1;
        const flutterGain = ctx.createGain(); flutterGain.gain.value = 4;
        flutter.connect(flutterGain);
        wow.start(now); flutter.start(now);
        nodes.push(wow, flutter);

        const mainSrc = ctx.createBufferSource();
        mainSrc.buffer = buffer;
        mainSrc.loop = false;
        wowGain.connect(mainSrc.detune);
        flutterGain.connect(mainSrc.detune);
        mainSrc.onended = an5001HandleEnded;
        nodes.push(mainSrc);

        const lowpassFilter = ctx.createBiquadFilter();
        lowpassFilter.type = 'lowpass'; lowpassFilter.frequency.value = 12000;
        const ringFilter = ctx.createBiquadFilter();
        ringFilter.type = 'peaking'; ringFilter.frequency.value = 5200; ringFilter.Q.value = 8; ringFilter.gain.value = 0;

        const softShaper = ctx.createWaveShaper();
        softShaper.curve = an5001DistortionCurve(2); softShaper.oversample = '2x';
        const hardClipDrive = ctx.createGain(); hardClipDrive.gain.value = 1;
        const hardClipShaper = ctx.createWaveShaper();
        hardClipShaper.curve = an5001HardClipCurve(); hardClipShaper.oversample = '2x';

        const stereoBus = ctx.createGain();
        stereoBus.channelCount = 2; stereoBus.channelCountMode = 'explicit'; stereoBus.channelInterpretation = 'speakers';
        const splitter = ctx.createChannelSplitter(2);
        const lGain = ctx.createGain(); lGain.gain.value = 1;
        const rGain = ctx.createGain(); rGain.gain.value = 1;
        const merger = ctx.createChannelMerger(2);

        const crushState = { bitDepth: 16, holdFactor: 1 };
        const bitcrusher = an5001MakeBitcrusher(ctx, crushState);
        nodes.push(bitcrusher);

        const mainChainGain = ctx.createGain(); mainChainGain.gain.value = 1;

        mainSrc.connect(lowpassFilter);
        lowpassFilter.connect(ringFilter);
        ringFilter.connect(softShaper);
        softShaper.connect(hardClipDrive);
        hardClipDrive.connect(hardClipShaper);
        hardClipShaper.connect(stereoBus);
        stereoBus.connect(splitter);
        splitter.connect(lGain, 0);
        splitter.connect(rGain, 1);
        lGain.connect(merger, 0, 0);
        rGain.connect(merger, 0, 1);
        merger.connect(bitcrusher);
        bitcrusher.connect(mainChainGain);
        mainChainGain.connect(master);

        const overlayBus = ctx.createGain(); overlayBus.gain.value = 1;
        overlayBus.connect(master);

        const hissSrc = ctx.createBufferSource();
        hissSrc.buffer = an5001MakeNoiseBuffer(ctx, 2); hissSrc.loop = true;
        const hissFilter = ctx.createBiquadFilter();
        hissFilter.type = 'highpass'; hissFilter.frequency.value = 4000;
        const hissGain = ctx.createGain(); hissGain.gain.value = 0.02;
        hissSrc.connect(hissFilter); hissFilter.connect(hissGain); hissGain.connect(master);
        hissSrc.start(now);
        nodes.push(hissSrc);

        const hum1 = ctx.createOscillator(); hum1.type = 'sine'; hum1.frequency.value = 60;
        const humGain = ctx.createGain(); humGain.gain.value = 0.016;
        hum1.connect(humGain); humGain.connect(master); hum1.start(now);
        nodes.push(hum1);

        const radioSrc = ctx.createBufferSource();
        radioSrc.buffer = an5001MakeNoiseBuffer(ctx, 2); radioSrc.loop = true;
        const radioFilter = ctx.createBiquadFilter();
        radioFilter.type = 'bandpass'; radioFilter.Q.value = 8; radioFilter.frequency.value = 1000;
        const radioGain = ctx.createGain(); radioGain.gain.value = 0.02;
        const radioLFO = ctx.createOscillator(); radioLFO.type = 'sine'; radioLFO.frequency.value = 0.08;
        const radioLFOGain = ctx.createGain(); radioLFOGain.gain.value = 850;
        radioLFO.connect(radioLFOGain); radioLFOGain.connect(radioFilter.frequency);
        radioSrc.connect(radioFilter); radioFilter.connect(radioGain); radioGain.connect(master);
        radioSrc.start(now); radioLFO.start(now);
        nodes.push(radioSrc, radioLFO);

        const startAt = Math.max(now, ctx.currentTime);
        mainSrc.start(startAt);

        return {
            master, analyser, nodes, startAt, duration: buffer.duration, volumeGain,
            mainSrc, mainChainGain, overlayBus, lGain, rGain,
            lowpassFilter, ringFilter, softShaper, hardClipDrive,
            wowGain, flutterGain, hissGain, humGain, radioGain, crushState
        };
    }

    window.an5001SetVolume = function(v) {
        an5001Volume = Math.max(0, Math.min(1, parseFloat(v)));
        if (an5001Ctx && an5001Live && an5001Live.volumeGain) {
            an5001Live.volumeGain.gain.setTargetAtTime(an5001Volume, an5001Ctx.currentTime, 0.05);
        }
    };

    function an5001HandleEnded() {
        if (audioTimers[AN5001_AUDIO_ID]) { clearTimeout(audioTimers[AN5001_AUDIO_ID]); delete audioTimers[AN5001_AUDIO_ID]; }
        state.anomalyLogsOpen[AN5001_AUDIO_ID] = false;
        state.anomalyLogsTyping[AN5001_AUDIO_ID] = null;
        an5001Stop(false);
        update();
    }

    function an5001SetInterference(active) {
        const el = document.getElementById(AN5001_AUDIO_ID + '-interference');
        if (el) el.textContent = active ? '\u26a1 SIGNAL INTERFERENCE - AUDIO DEGRADED' : '';
        const label = document.getElementById(AN5001_AUDIO_ID + '-statuslabel');
        if (label) label.textContent = active ? 'INTERFERENCE' : 'PLAYING';
    }

    function an5001Lerp(a, b, t) {
        const ct = Math.max(0, Math.min(1, t));
        return a + (b - a) * ct;
    }

    function an5001PhaseProgress() {
        if (!an5001Ctx || !an5001Live) return 0;
        const elapsed = an5001Ctx.currentTime - an5001Live.startAt;
        return Math.max(0, Math.min(1, elapsed / an5001Live.duration));
    }

    function an5001TriggerDropout(p) {
        const L = an5001Live;
        if (!an5001Ctx || !L) return;
        const now = an5001Ctx.currentTime;
        const severe = p > 0.8 && Math.random() < 0.4;
        const depth = severe ? (0.9 + Math.random() * 0.1) : (0.2 + p * 0.5 + Math.random() * 0.25);
        const dur = severe ? (0.2 + Math.random() * 0.9) : (0.08 + Math.random() * 0.35);
        const base = L.mainChainGain.gain.value;
        an5001SetInterference(true);
        L.mainChainGain.gain.cancelScheduledValues(now);
        L.mainChainGain.gain.setValueAtTime(base, now);
        L.mainChainGain.gain.linearRampToValueAtTime(Math.max(0.0005, base * (1 - depth)), now + dur * 0.25);
        L.mainChainGain.gain.linearRampToValueAtTime(base, now + dur);
        const rBase = L.radioGain.gain.value;
        L.radioGain.gain.cancelScheduledValues(now);
        L.radioGain.gain.setValueAtTime(rBase, now);
        L.radioGain.gain.linearRampToValueAtTime(rBase * 3, now + dur * 0.3);
        L.radioGain.gain.linearRampToValueAtTime(rBase, now + dur + 0.1);
        setTimeout(() => an5001SetInterference(false), dur * 1000 + 100);
    }

    function an5001TriggerReverseFragment() {
        const L = an5001Live;
        if (!an5001Ctx || !L || !an5001SourceBuffer) return;
        const playhead = an5001Ctx.currentTime - L.startAt;
        const back = 0.4 + Math.random() * 2.2;
        const dur = 0.25 + Math.random() * 0.9;
        const slice = an5001ExtractSlice(an5001SourceBuffer, playhead - back - dur, dur, true);
        if (!slice) return;
        const now = an5001Ctx.currentTime;
        const src = an5001Ctx.createBufferSource();
        src.buffer = slice;
        const g = an5001Ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.22 + Math.random() * 0.2, now + dur * 0.15);
        g.gain.linearRampToValueAtTime(0, now + dur);
        const f = an5001Ctx.createBiquadFilter();
        f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.7;
        src.connect(f); f.connect(g); g.connect(L.overlayBus);
        src.start(now); src.stop(now + dur + 0.05);
    }

    function an5001TriggerPreEcho() {
        const L = an5001Live;
        if (!an5001Ctx || !L || !an5001SourceBuffer) return;
        const playhead = an5001Ctx.currentTime - L.startAt;
        const ahead = 0.8 + Math.random() * 3.2;
        const dur = 0.2 + Math.random() * 0.5;
        const slice = an5001ExtractSlice(an5001SourceBuffer, playhead + ahead, dur, false);
        if (!slice) return;
        const now = an5001Ctx.currentTime;
        const src = an5001Ctx.createBufferSource();
        src.buffer = slice;
        const g = an5001Ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.1 + Math.random() * 0.12, now + dur * 0.2);
        g.gain.linearRampToValueAtTime(0, now + dur);
        const f = an5001Ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = 900;
        src.connect(f); f.connect(g); g.connect(L.overlayBus);
        src.start(now); src.stop(now + dur + 0.05);
    }

    function an5001TriggerMicroLoop() {
        const L = an5001Live;
        if (!an5001Ctx || !L || !an5001SourceBuffer) return;
        const playhead = an5001Ctx.currentTime - L.startAt;
        const sliceDur = 0.03 + Math.random() * 0.09;
        const slice = an5001ExtractSlice(an5001SourceBuffer, playhead - sliceDur * 1.5, sliceDur, false);
        if (!slice) return;
        const now = an5001Ctx.currentTime;
        const reps = 3 + Math.floor(Math.random() * 5);
        const totalDur = sliceDur * reps;
        const src = an5001Ctx.createBufferSource();
        src.buffer = slice; src.loop = true; src.loopStart = 0; src.loopEnd = slice.duration;
        const g = an5001Ctx.createGain(); g.gain.value = 0.5;
        src.connect(g); g.connect(L.overlayBus);
        src.start(now); src.stop(now + totalDur);
        const baseMain = L.mainChainGain.gain.value;
        L.mainChainGain.gain.cancelScheduledValues(now);
        L.mainChainGain.gain.setValueAtTime(baseMain, now);
        L.mainChainGain.gain.linearRampToValueAtTime(baseMain * 0.08, now + 0.02);
        L.mainChainGain.gain.setValueAtTime(baseMain * 0.08, now + totalDur - 0.03);
        L.mainChainGain.gain.linearRampToValueAtTime(baseMain, now + totalDur + 0.05);
    }

    function an5001TriggerStaticBurst() {
        const L = an5001Live;
        if (!an5001Ctx || !L) return;
        const now = an5001Ctx.currentTime;
        const dur = 0.15 + Math.random() * 0.4;
        const buf = an5001MakeNoiseBuffer(an5001Ctx, dur);
        const src = an5001Ctx.createBufferSource();
        src.buffer = buf;
        const f = an5001Ctx.createBiquadFilter();
        f.type = 'bandpass'; f.frequency.value = 800 + Math.random() * 3000; f.Q.value = 1.5;
        const g = an5001Ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.22 + Math.random() * 0.25, now + 0.02);
        g.gain.linearRampToValueAtTime(0, now + dur);
        src.connect(f); f.connect(g); g.connect(L.overlayBus);
        src.start(now); src.stop(now + dur + 0.02);
    }

    function an5001TriggerPhaseInvert() {
        const L = an5001Live;
        if (!an5001Ctx || !L) return;
        const now = an5001Ctx.currentTime;
        const dur = 0.15 + Math.random() * 0.6;
        const cur = L.rGain.gain.value;
        L.rGain.gain.cancelScheduledValues(now);
        L.rGain.gain.setValueAtTime(cur, now);
        L.rGain.gain.linearRampToValueAtTime(-Math.abs(cur), now + 0.02);
        L.rGain.gain.linearRampToValueAtTime(cur, now + dur);
    }

    function an5001TriggerPitchLurch() {
        const L = an5001Live;
        if (!an5001Ctx || !L) return;
        const now = an5001Ctx.currentTime;
        const amt = (Math.random() < 0.5 ? -1 : 1) * (300 + Math.random() * 1100);
        try {
            L.mainSrc.detune.cancelScheduledValues(now);
            L.mainSrc.detune.setValueAtTime(L.mainSrc.detune.value, now);
            L.mainSrc.detune.linearRampToValueAtTime(amt, now + 0.06 + Math.random() * 0.12);
            L.mainSrc.detune.linearRampToValueAtTime(0, now + 0.3 + Math.random() * 0.5);
        } catch (e) {}
    }

    function an5001Tick() {
        const L = an5001Live;
        if (!an5001Ctx || !L) return;
        const p = an5001PhaseProgress();
        const now = an5001Ctx.currentTime;

        const lowpassFreq = an5001Lerp(11000, 900, p);
        const ringGainDb = an5001Lerp(0, 15, Math.max(0, p - 0.15) / 0.85);
        const driveAmt = an5001Lerp(2, 20, Math.max(0, p - 0.35) / 0.65);
        const clipDrive = 1 + an5001Lerp(0, 6, Math.max(0, p - 0.35) / 0.65);
        const wowDepth = an5001Lerp(15, 85, p);
        const flutterDepth = an5001Lerp(4, 40, p);
        const hissLvl = an5001Lerp(0.02, 0.07, p);
        const radioBase = an5001Lerp(0.02, 0.11, p);
        const imbalance = an5001Lerp(0, 0.55, Math.max(0, p - 0.35) / 0.65);
        const bias = Math.sin(now * 0.13);

        L.lowpassFilter.frequency.setTargetAtTime(lowpassFreq, now, 0.3);
        L.ringFilter.gain.setTargetAtTime(ringGainDb, now, 0.3);
        L.hardClipDrive.gain.setTargetAtTime(clipDrive, now, 0.3);
        L.wowGain.gain.setTargetAtTime(wowDepth, now, 0.4);
        L.flutterGain.gain.setTargetAtTime(flutterDepth, now, 0.4);
        L.hissGain.gain.setTargetAtTime(hissLvl, now, 0.5);
        L.radioGain.gain.setTargetAtTime(radioBase, now, 0.5);
        L.lGain.gain.setTargetAtTime(1 - Math.max(0, bias) * imbalance, now, 0.6);
        L.rGain.gain.setTargetAtTime(1 - Math.max(0, -bias) * imbalance, now, 0.6);
        L.crushState.bitDepth = p < 0.35 ? 16 : an5001Lerp(14, 3, (p - 0.35) / 0.65);
        L.crushState.holdFactor = p < 0.35 ? 1 : an5001Lerp(1, 9, (p - 0.35) / 0.65);

        if (Math.abs(driveAmt - L._lastDrive || 0) > 1) {
            L.softShaper.curve = an5001DistortionCurve(driveAmt);
            L._lastDrive = driveAmt;
        }

        const unpredict = p * p;
        if (p > 0.15 && Math.random() < 0.02 + unpredict * 0.15) an5001TriggerReverseFragment();
        if (p > 0.55 && Math.random() < 0.015 + unpredict * 0.18) an5001TriggerPreEcho();
        if (p > 0.35 && Math.random() < 0.015 + unpredict * 0.15) an5001TriggerMicroLoop();
        if (p > 0.55 && Math.random() < 0.01 + unpredict * 0.2) an5001TriggerStaticBurst();
        if (p > 0.35 && Math.random() < 0.012 + unpredict * 0.15) an5001TriggerPhaseInvert();
        if (p > 0.55 && Math.random() < 0.01 + unpredict * 0.12) an5001TriggerPitchLurch();
        if (Math.random() < 0.01 + unpredict * 0.2) an5001TriggerDropout(p);
    }

    function an5001ScheduleBeep() {
        if (!an5001Ctx) return;
        const delay = 3500 + Math.random() * 5000;
        an5001BeepTimer = setTimeout(() => {
            if (!an5001Ctx || !an5001Live) return;
            const now = an5001Ctx.currentTime;
            const osc = an5001Ctx.createOscillator();
            osc.type = 'sine'; osc.frequency.value = 650 + Math.random() * 900;
            const g = an5001Ctx.createGain();
            g.gain.setValueAtTime(0, now);
            g.gain.linearRampToValueAtTime(0.045, now + 0.008);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
            osc.connect(g); g.connect(an5001Live.master);
            osc.start(now); osc.stop(now + 0.2);
            an5001ScheduleBeep();
        }, delay);
    }

    function an5001Draw() {
        const canvas = document.getElementById(AN5001_AUDIO_ID + '-canvas');
        if (canvas) {
            const c = canvas.getContext('2d');
            const w = canvas.width, h = canvas.height;
            c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
            if (an5001Analyser) {
                const data = new Uint8Array(an5001Analyser.frequencyBinCount);
                an5001Analyser.getByteFrequencyData(data);
                const barCount = Math.min(48, data.length);
                const barW = w / barCount;
                for (let i = 0; i < barCount; i++) {
                    const v = data[i] / 255;
                    const bh = Math.max(1, v * h);
                    c.fillStyle = i % 6 === 0 ? '#ffb300' : '#00e5ff';
                    c.globalAlpha = 0.9;
                    c.fillRect(i * barW, h - bh, Math.max(1, barW - 1), bh);
                }
                c.globalAlpha = 1;
            }
        }
        an5001RafId = requestAnimationFrame(an5001Draw);
    }

    async function an5001Start() {
        if (!an5001Ctx) an5001Ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (an5001Ctx.state === 'suspended') an5001Ctx.resume();
        an5001Stop(true);
        const built = await an5001BuildGraph(an5001Ctx);
        an5001Live = built;
        an5001Analyser = built.analyser;

        const now = an5001Ctx.currentTime;
        built.master.gain.cancelScheduledValues(now);
        built.master.gain.setValueAtTime(0.0001, now);
        built.master.gain.exponentialRampToValueAtTime(0.5, now + 1.1);

        an5001ScheduleBeep();
        clearInterval(an5001TickTimer);
        an5001TickTimer = setInterval(an5001Tick, 180);
        if (!an5001RafId) an5001Draw();
    }

    function an5001Stop(silent) {
        clearTimeout(an5001BeepTimer);
        clearInterval(an5001TickTimer);
        const ctx = an5001Ctx, L = an5001Live;
        if (L && ctx) {
            const now = ctx.currentTime;
            try {
                L.master.gain.cancelScheduledValues(now);
                L.master.gain.setValueAtTime(L.master.gain.value, now);
                L.master.gain.exponentialRampToValueAtTime(0.0001, now + (silent ? 0.01 : 0.4));
            } catch (e) {}
        }
        an5001Live = null;
        if (!silent) {
            an5001SetInterference(false);
            setTimeout(() => { an5001Analyser = null; }, 450);
        }
        if (L) {
            setTimeout(() => {
                L.nodes.forEach(n => {
                    try { n.stop && n.stop(); } catch (e) {}
                    try { n.disconnect && n.disconnect(); } catch (e) {}
                });
            }, silent ? 20 : 450);
        }
    }

    window.toggleNorthstarAudioLog = function(id) {
        const wasPlaying = !!state.anomalyLogsOpen[id];
        toggleAnomalyLog(id);
        const isPlayingNow = !!state.anomalyLogsOpen[id];
        if (isPlayingNow && !wasPlaying) an5001Start();
        if (!isPlayingNow && wasPlaying) an5001Stop(false);
    };

    function renderNorthstarAudioLog(logId, opts) {
        AUDIO_LOG_LINES[logId] = opts.lines;
        const total = opts.lines.length;
        const isPlaying = !!state.anomalyLogsOpen[logId];
        const typing = state.anomalyLogsTyping[logId];
        const progress = Math.min(state.anomalyLogsProgress[logId] || 0, total);
        const started = progress > 0 || isPlaying || !!typing;
        const finished = progress >= total && !typing;
        const isHoldingAtEnd = logId === AN5001_AUDIO_ID && isPlaying && finished && !!an5001Live;
        const isWaiting = isPlaying && !typing && !finished;
        const seed = seedFromString(logId);

        const linesHtml = opts.lines.map((l, i) => {
            if (i < progress) {
                return `
                <div class="decode-line text-xs leading-snug">
                    <span class="text-[var(--color-cyan-dim)] font-mono-tech mr-2">[${l.time}]</span>
                    ${l.speaker ? `<span class="text-[var(--color-amber)] font-bold mr-1">${l.speaker}:</span>` : ''}
                    <span class="${l.speaker ? 'text-[var(--color-text-dim)]' : 'text-[var(--color-cyan-dim)] italic'}">${l.text}</span>
                </div>`;
            }
            if (typing && typing.line === i) {
                const shown = l.text.slice(0, typing.chars);
                return `
                <div class="decode-line-current text-xs leading-snug">
                    <span class="text-[var(--color-cyan-dim)] font-mono-tech mr-2">[${l.time}]</span>
                    ${l.speaker ? `<span class="text-[var(--color-amber)] font-bold mr-1">${l.speaker}:</span>` : ''}
                    <span class="${l.speaker ? 'text-white' : 'text-[var(--color-cyan)] italic'}">${shown}<span class="type-cursor">\u258c</span></span>
                </div>`;
            }
            const w = Math.min(92, Math.max(24, l.text.length * 2.1));
            return `<div class="cassette-lock-bar my-1.5" style="width:${w.toFixed(0)}%;" title="LOCKED - CANNOT SKIP AHEAD OF PLAYBACK" onclick="revealRedact(this)"></div>`;
        }).join('');

        const statusLabel = isHoldingAtEnd ? 'SIGNAL CONTINUES' : (isPlaying ? 'PLAYING' : (finished ? 'STOPPED' : (started ? 'PAUSED' : 'STOPPED')));

        return `
        <div class="tech-border bg-black p-3 my-3" style="${isPlaying ? 'border-color:var(--color-red);' : ''}">
            <div class="flex items-center justify-between mb-2 gap-2">
                <div class="min-w-0">
                    <div class="text-xs font-bold text-white truncate">${opts.title}</div>
                    <div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest truncate">${opts.subtitle}</div>
                </div>
                <div class="text-[9px] text-[var(--color-text-dim)] font-mono-tech shrink-0 text-right">
                    ${opts.duration}<br><span id="${logId}-statuslabel" class="${isPlaying ? 'text-[var(--color-red)]' : ''}">${statusLabel}</span>
                </div>
            </div>
            <div class="cassette-unit my-2">
                ${cassetteSVG(seed, isPlaying)}
            </div>
            <div class="flex items-center justify-center gap-3 mb-1">
                <button onclick="toggleNorthstarAudioLog('${logId}')" class="w-9 h-9 shrink-0 flex items-center justify-center border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-black transition-colors">
                    <i data-lucide="${isPlaying ? 'pause' : (finished ? 'rotate-ccw' : 'play')}" class="w-4 h-4"></i>
                </button>
                <canvas id="${logId}-canvas" width="440" height="60" class="flex-1 max-w-[220px]" style="height:26px;background:#000;border:1px solid var(--color-panel-border);"></canvas>
            </div>
            <div class="flex items-center gap-2 mb-1 px-0.5">
                <i data-lucide="volume-2" class="w-3 h-3 text-[var(--color-cyan-dim)] shrink-0"></i>
                <input type="range" min="0" max="100" value="${Math.round(an5001Volume * 100)}" oninput="an5001SetVolume(this.value/100)" class="flex-1" style="accent-color:var(--color-cyan);height:3px;">
                <span class="text-[8px] text-[var(--color-text-dim)] font-mono-tech w-7 text-right">${Math.round(an5001Volume * 100)}%</span>
            </div>
            <div id="${logId}-interference" class="text-[8px] text-center uppercase tracking-widest mb-2 h-3" style="color:var(--color-red);letter-spacing:.12em;"></div>
            <div class="border-t border-[var(--color-panel-border)] pt-2">
                <div class="flex items-center justify-between text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1.5">
                    <span>Signal Analysis Log</span>
                    <span>${started ? (isHoldingAtEnd ? 'TRANSCRIPT COMPLETE' : `${progress} / ${total} LINES DECODED`) : 'SIGNAL LOCKED'}</span>
                </div>
                ${started ? `
                <div class="cassette-log-box flex flex-col gap-0.5 h-32 sm:h-44 overflow-y-auto custom-scrollbar bg-[#010405] border border-[var(--color-panel-border)] p-2 pt-3" id="log-scroll-${logId}" data-scroll-id="cassette-log-${logId}">
                    ${linesHtml}
                </div>
                ${(isWaiting || isHoldingAtEnd) ? `<div class="cassette-waiting text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mt-1.5 text-center">\u2022 \u2022 \u2022 signal continues \u2022 \u2022 \u2022</div>` : ''}
                ` : `<div class="text-[9px] text-[var(--color-text-dim)] italic pt-1">TRANSCRIPT SEALED - PRESS PLAY TO BEGIN DECODING THE SIGNAL. PLAYBACK CANNOT BE SKIPPED AHEAD.</div>`}
            </div>
            <div class="text-[8px] text-[var(--color-text-dim)] italic mt-2">LOCAL WAVEFORM SYNTHESIS FOR ANALYSIS PLAYBACK ONLY. NO SOURCE RECORDING IS ON FILE.</div>
        </div>`;
    }


    function renderArchiveApp() {
        const currentDir = DB_FILESYSTEM[state.archivePath[state.archivePath.length - 1]];
        let fileContentHtml = '';
        
        if (state.archiveViewFile) {
            const file = DB_FILESYSTEM[state.archiveViewFile];
            const isRestrictedDoc = state.archivePath.includes('restricted');
            fileContentHtml = `
                <div class="flex-1 h-full p-4 overflow-y-auto bg-[var(--color-panel)] border-l border-[var(--color-panel-border)] flex flex-col font-mono-tech relative" data-scroll-id="archive-file">
                    ${isRestrictedDoc ? `<div class="doc-stamp">CLASSIFIED</div>` : ''}
                    <div class="flex justify-between items-center mb-4 border-b border-[var(--color-cyan-dim)] pb-2 shrink-0">
                        <span class="text-[var(--color-cyan)] font-bold text-lg break-all pr-2">${file.name}</span>
                        <button onclick="state.archiveViewFile = null; update()" class="flex items-center gap-1 text-xs border border-[var(--color-cyan-dim)] px-2 py-1 hover:bg-[var(--color-cyan)] hover:text-black shrink-0">
                            <i data-lucide="arrow-left" class="w-3 h-3"></i> <span class="hidden sm:inline">BACK TO FOLDER</span>
                        </button>
                    </div>
                    ${isRestrictedDoc ? `<div class="doc-header-block font-mono-tech">CLASSIFICATION: OMEGA &bull; DISTRIBUTION: DIRECTORATE COUNCIL AUTHORIZATION ONLY<br>Sections rendered as solid bars are permanently sealed at Council order. No clearance code unseals them.</div>` : ''}
                    <div class="text-[var(--color-text-dim)] whitespace-pre-wrap text-sm leading-relaxed">${file.content}</div>
                </div>`;
        }

        const breadcrumbHtml = state.archivePath.map((k, i) => {
            const isLast = i === state.archivePath.length - 1;
            const label = i === 0 ? 'ROOT' : (DB_FILESYSTEM[k]?.name || k);
            return `<span onclick="${isLast ? '' : `archiveJumpTo(${i})`}" class="${isLast ? 'text-white' : 'text-[var(--color-cyan-dim)] hover:text-[var(--color-cyan)] cursor-pointer underline decoration-dotted'}">${label}</span>`;
        }).join('<span class="text-[var(--color-panel-border)] mx-1">/</span>');

        let dirHtml = '';
        if (!currentDir) {
            dirHtml = '<div class="p-4 text-red-500">DIRECTORY ERROR</div>';
        } else if (currentDir.type === 'restricted_dir' && !state.restrictedUnlocked) {
            dirHtml = `
            <div class="flex-1 flex flex-col items-center justify-center p-8 text-center font-mono-tech">
                <i data-lucide="shield-alert" class="w-16 h-16 text-[var(--color-red)] mb-4 red-glow animate-flicker"></i>
                <div class="text-[var(--color-red)] font-bold text-xl tracking-widest mb-2">CLASSIFIED OMEGA</div>
                <div class="text-[var(--color-text-dim)] text-xs mb-6">RESTRICTED ARCHIVE. CLEARANCE REQUIRED.</div>
                <input type="text" id="restricted-input" class="bg-black border border-[var(--color-red)] text-[var(--color-red)] px-4 py-2 text-center focus:outline-none mb-4 uppercase" style="-webkit-text-security:disc; text-security:disc;" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore data-bwignore placeholder="PASSWORD">
                <button onclick="unlockRestricted()" class="border border-[var(--color-red)] text-[var(--color-red)] px-6 py-2 hover:bg-[var(--color-red)] hover:text-black transition-colors font-bold mb-4">DECRYPT</button>
                <div id="restricted-error" class="text-[var(--color-red)] text-xs mb-4 h-4"></div>
                <button onclick="archiveBack()" class="flex items-center gap-1 text-[10px] border border-[var(--color-cyan-dim)] text-[var(--color-cyan-dim)] px-3 py-1 hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]">
                    <i data-lucide="arrow-left" class="w-3 h-3"></i> BACK
                </button>
            </div>`;
        } else {
            const items = currentDir.children.map(key => {
                const item = DB_FILESYSTEM[key];
                const icon = item.type === 'file' ? 'file-text' : (item.type === 'restricted_dir' ? 'shield' : 'folder');
                const color = item.type === 'restricted_dir' ? 'text-[var(--color-red)]' : 'text-[var(--color-cyan)]';
                return `
                <div onclick="archiveClick('${key}')" class="flex items-center gap-3 p-2 hover:bg-[var(--color-panel-border)] cursor-pointer group border-b border-[var(--color-panel)] font-mono-tech">
                    <i data-lucide="${icon}" class="w-5 h-5 ${color} group-hover:static-glow"></i>
                    <span class="text-[var(--color-text-dim)] group-hover:text-white text-sm uppercase">${item.name}</span>
                </div>`;
            }).join('');
            
            dirHtml = `
            <div class="w-full md:w-1/2 lg:w-1/3 mobile-cap md:h-full overflow-y-auto flex flex-col bg-black border-b md:border-b-0 md:border-r border-[var(--color-panel-border)]" data-scroll-id="archive-dir-outer">
                <div class="p-2 border-b border-[var(--color-cyan-dim)] bg-[var(--color-panel)] shrink-0 flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <button onclick="archiveBack()" ${state.archivePath.length <= 1 ? 'disabled' : ''} class="flex items-center gap-1 text-[10px] px-2 py-1 border ${state.archivePath.length > 1 ? 'border-[var(--color-cyan-dim)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-black cursor-pointer' : 'border-[var(--color-panel-border)] text-[var(--color-text-dim)] opacity-40 cursor-not-allowed'}">
                            <i data-lucide="arrow-left" class="w-3 h-3"></i> BACK
                        </button>
                        <i data-lucide="hard-drive" class="w-3 h-3 text-[var(--color-cyan-dim)] shrink-0"></i>
                    </div>
                    <div class="text-[10px] font-mono-tech leading-relaxed break-words">${breadcrumbHtml}</div>
                </div>
                <div class="flex-1 overflow-y-auto" data-scroll-id="archive-dir">${items}</div>
            </div>`;
        }

        return `
        <div class="w-full h-full flex flex-col md:flex-row">
            ${dirHtml}
            ${fileContentHtml || (state.archivePath[state.archivePath.length-1] === 'restricted' && !state.restrictedUnlocked ? '' : `<div class="flex-1 flex items-center justify-center text-[var(--color-panel-border)]"><i data-lucide="database" class="w-32 h-32 opacity-20"></i></div>`)}
        </div>`;
    }

    window.archiveClick = function(key) {
        const item = DB_FILESYSTEM[key];
        if (item.type === 'file') {
            state.archiveViewFile = key;
        } else {
            state.archivePath.push(key);
            state.archiveViewFile = null;
        }
        update();
    };

    window.archiveBack = function() {
        if (state.archivePath.length > 1) {
            state.archivePath.pop();
            state.archiveViewFile = null;
            update();
        }
    };

    window.archiveJumpTo = function(index) {
        if (index >= 0 && index < state.archivePath.length - 1) {
            state.archivePath = state.archivePath.slice(0, index + 1);
            state.archiveViewFile = null;
            update();
        }
    };

    window.revealRedact = function(el) {
        el.classList.add('denied');
        setTimeout(() => el.classList.remove('denied'), 500);
    };

    window.toggleDecryptPanel = function() {
        state.showDecryptPanel = !state.showDecryptPanel;
        state.decryptError = '';
        update();
    };

    window.submitDecryptCode = function() {
        const input = document.getElementById('decrypt-input');
        if (!input) return;
        const val = input.value.trim().toUpperCase();
        state.decryptError = (val === DECRYPT_CODE)
            ? 'CODE RECOGNIZED - REDACTIONS ARE PERMANENT'
            : 'ACCESS DENIED';
        input.value = '';
        update();
    };

    function renderDecryptPanel() {
        if (!state.showDecryptPanel) return '';
        return `
        <div class="decrypt-panel font-mono-tech">
            <div class="flex justify-between items-center mb-2">
                <span class="text-[10px] text-[var(--color-cyan)] uppercase tracking-widest">Local Decryption</span>
                <button onclick="toggleDecryptPanel()" class="text-[var(--color-text-dim)] hover:text-[var(--color-red)]"><i data-lucide="x" class="w-3 h-3"></i></button>
            </div>
            <div class="text-[9px] text-[var(--color-text-dim)] mb-2 leading-relaxed">Redacted material is permanently sealed at Council order. No clearance code unseals it from this terminal.</div>
            <input id="decrypt-input" type="text" placeholder="CODE" autocomplete="off" onkeypress="if(event.key === 'Enter') submitDecryptCode()" class="w-full bg-black border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] px-2 py-1.5 text-xs font-mono-tech mb-2 uppercase tracking-widest" />
            <button onclick="submitDecryptCode()" class="w-full border border-[var(--color-cyan)] text-[var(--color-cyan)] py-1.5 text-[10px] uppercase tracking-widest hover:bg-[var(--color-cyan)] hover:text-black transition-colors">Decrypt</button>
            <div class="text-[9px] text-[var(--color-red)] mt-2 h-3 uppercase">${state.decryptError}</div>
        </div>`;
    }

    window.unlockRestricted = function() {
        const input = document.getElementById('restricted-input').value.trim().toUpperCase();
        if (input === 'OBSIDIAN') {
            state.restrictedUnlocked = true;
            update();
        } else {
            document.getElementById('restricted-error').innerText = 'ACCESS DENIED';
            setTimeout(() => { const el = document.getElementById('restricted-error'); if (el) el.innerText = ''; }, 2000);
        }
    };

    const DB_GAUGE_INFO = {
        processor: {
            label: 'Systems / Processor Load', colorVar: '--color-cyan',
            desc: 'Aggregate load across Streymoy\'s photonic processor cluster and every synchronized holding mainframe. Sustained readings above 95% typically precede a scheduled defragmentation cycle - see COMMS_RELAY for maintenance notices from Meridian Systems.',
            range: '78% – 99.5% nominal operating band'
        },
        resonance: {
            label: 'Crystalline Resonance', colorVar: '--color-amber',
            desc: 'Lattice stability of the crystalline subsystems that let Meridian hardware process anomalous data without corruption. The analog CRT buffer housings exist specifically to keep this figure from drifting outside tolerance.',
            range: '70% – 99% nominal operating band'
        },
        relay: {
            label: 'Relay Network Throughput', colorVar: '--color-cyan',
            desc: 'Live bandwidth across the encrypted crystalline relay linking Streymoy to Iceland, Newfoundland, and Scotland. Dips below 60% typically correlate with North Atlantic atmospheric interference logged at Iceland Station.',
            range: '55% – 98% nominal operating band'
        }
    };

    window.showDashboardDetail = function(type, key) {
        state.dashboardDetail = { type, key };
        update();
    };
    window.closeDashboardDetail = function() {
        state.dashboardDetail = null;
        update();
    };
    window.jumpToFacilityFromDashboard = function(key) {
        state.dashboardDetail = null;
        selectFacility(key);
        const win = state.windows.find(w => w.id === 'map');
        win.open = true;
        if (isMobileViewport()) win.maximized = true;
        bringToFront('map');
        update();
    };
    window.jumpToRegistryFromDashboard = function() {
        state.dashboardDetail = null;
        const win = state.windows.find(w => w.id === 'registry');
        win.open = true;
        if (isMobileViewport()) win.maximized = true;
        bringToFront('registry');
        update();
    };
    window.openAnomalyFile = function(windowId) {
        const win = state.windows.find(w => w.id === windowId);
        if (!win) return;
        win.open = true;
        if (isMobileViewport()) win.maximized = true;
        bringToFront(windowId);
        update();
    };
    function stopAllCassettes() {
        Object.keys(audioTimers).forEach(id => {
            clearTimeout(audioTimers[id]);
            delete audioTimers[id];
            state.anomalyLogsOpen[id] = false;
        });
        an5001Stop(false);
    }
    window.setAnomalySection = function(id) {
        stopAllCassettes();
        state.anomalySection = id;
        update();
    };
    window.toggleAnomalyLog = function(id) {
        const isPlaying = !!state.anomalyLogsOpen[id];
        if (isPlaying) {
            state.anomalyLogsOpen[id] = false;
            if (audioTimers[id]) { clearTimeout(audioTimers[id]); delete audioTimers[id]; }
            update();
            return;
        }
        const lines = AUDIO_LOG_LINES[id] || [];
        if ((state.anomalyLogsProgress[id] || 0) >= lines.length) {
            state.anomalyLogsProgress[id] = 0;
            state.anomalyLogsTyping[id] = null;
        }
        state.anomalyLogsOpen[id] = true;
        if (audioTimers[id]) clearTimeout(audioTimers[id]);

        const isNearBottom = () => {
            const logEl = document.getElementById('log-scroll-' + id);
            return !logEl || (logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 40);
        };
        const followIfBottom = (wasAtBottom) => {
            if (!wasAtBottom) return;
            const logEl = document.getElementById('log-scroll-' + id);
            if (logEl) logEl.scrollTop = logEl.scrollHeight;
        };

        function typeStep() {
            if (!state.anomalyLogsOpen[id]) return;
            let typing = state.anomalyLogsTyping[id];
            if (!typing) {
                const lineIdx = state.anomalyLogsProgress[id] || 0;
                if (lineIdx >= lines.length) {
                    if (id === AN5001_AUDIO_ID && an5001Live) { return; }
                    state.anomalyLogsOpen[id] = false;
                    update();
                    return;
                }
                typing = { line: lineIdx, chars: 0 };
                state.anomalyLogsTyping[id] = typing;
            }
            const wasAtBottom = isNearBottom();
            const fullText = lines[typing.line].text;
            if (typing.chars < fullText.length) {
                typing.chars += 1;
                update();
                followIfBottom(wasAtBottom);
                audioTimers[id] = setTimeout(typeStep, 20 + Math.random() * 26);
                return;
            }
            const finishedLine = typing.line;
            state.anomalyLogsProgress[id] = finishedLine + 1;
            state.anomalyLogsTyping[id] = null;
            update();
            followIfBottom(wasAtBottom);
            if (state.anomalyLogsProgress[id] >= lines.length) {
                if (id === AN5001_AUDIO_ID && an5001Live) { return; }
                state.anomalyLogsOpen[id] = false;
                update();
                return;
            }
            const prevTime = timeToSeconds(lines[finishedLine].time);
            const nextTime = timeToSeconds(lines[state.anomalyLogsProgress[id]].time);
            const wait = Math.min(3200, Math.max(450, (nextTime - prevTime) * 1000));
            audioTimers[id] = setTimeout(typeStep, wait);
        }

        update();
        audioTimers[id] = setTimeout(typeStep, 500);
    };

    function renderDashboardDetailOverlay() {
        const d = state.dashboardDetail;
        if (!d) return '';

        let body = '';
        if (d.type === 'gauge') {
            const info = DB_GAUGE_INFO[d.key];
            const value = state.telemetryStats[d.key];
            body = `
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">${info.label}</div>
                <div class="text-4xl font-bold static-glow mb-2" style="color: var(${info.colorVar});">${value.toFixed(1)}%</div>
                <div class="text-xs text-[var(--color-text-dim)] leading-relaxed mb-3">${info.desc}</div>
                <div class="text-[10px] text-white border-t border-[var(--color-panel-border)] pt-2">NOMINAL RANGE: <span class="text-[var(--color-amber)]">${info.range}</span></div>`;
        } else if (d.type === 'facility') {
            const fac = DB_FACILITIES[d.key];
            const roomCount = fac.levels.reduce((n, l) => n + l.rooms.length, 0);
            const alertCount = fac.levels.reduce((n, l) => n + l.rooms.filter(r => r.alert).length, 0);
            body = `
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Facility Uplink Detail</div>
                <div class="text-lg font-bold text-white mb-1">${fac.name}</div>
                <div class="text-[10px] text-[var(--color-text-dim)] mb-3">${fac.location} &bull; EST. ${fac.established} &bull; STATUS: <span class="text-[var(--color-cyan)]">${fac.status}</span></div>
                <div class="text-xs text-[var(--color-text-dim)] leading-relaxed mb-3">${fac.desc}</div>
                <div class="grid grid-cols-3 gap-2 text-[10px] mb-4 border-t border-[var(--color-panel-border)] pt-2">
                    <div><span class="text-[var(--color-text-dim)] block">PERSONNEL</span><span class="text-white font-bold">${fac.personnel}</span></div>
                    <div><span class="text-[var(--color-text-dim)] block">MAPPED ROOMS</span><span class="text-white font-bold">${roomCount}</span></div>
                    <div><span class="text-[var(--color-text-dim)] block">ACTIVE ALERTS</span><span class="font-bold ${alertCount ? 'text-[var(--color-amber)]' : 'text-white'}">${alertCount}</span></div>
                </div>
                <button onclick="jumpToFacilityFromDashboard('${d.key}')" class="w-full text-[10px] uppercase tracking-widest py-2 border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:bg-opacity-10 transition-colors">Open Facility Schematics &rarr;</button>`;
        } else if (d.type === 'anomaly') {
            const cls = DB_ANOMALIES.find(a => a.class === d.key);
            body = `
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Containment Class Detail</div>
                <div class="text-lg font-bold text-white mb-1 ${cls.class === 'Class 5' || cls.class === 'Class 6' ? 'text-[var(--color-amber)]' : ''}">${cls.class}</div>
                <div class="text-[10px] text-[var(--color-text-dim)] mb-3">STARTING LIMIT: <span class="text-white font-bold">${cls.limit}</span></div>
                <div class="text-xs text-[var(--color-text-dim)] leading-relaxed mb-4">${cls.items.length === 0 ? 'No anomalies are currently registered in this classification bracket at Streymoy. Per standing Directorate philosophy, an anomaly is only ever transferred into a containment vault if it cannot be safely studied in the open, or is deliberately withheld from governments and corporations.' : `${cls.items.length} anomal${cls.items.length === 1 ? 'y is' : 'ies are'} currently registered in this bracket.`}</div>
                <button onclick="jumpToRegistryFromDashboard()" class="w-full text-[10px] uppercase tracking-widest py-2 border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:bg-opacity-10 transition-colors">Open Anomaly Registry &rarr;</button>`;
        }

        return `
        <div class="absolute inset-0 z-30 bg-black bg-opacity-80 flex items-center justify-center p-4" onclick="closeDashboardDetail()">
            <div class="tech-border bg-[var(--color-panel)] max-w-sm w-full p-4 font-mono-tech relative" onclick="event.stopPropagation()">
                <button onclick="closeDashboardDetail()" class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-[var(--color-cyan-dim)] hover:text-[var(--color-red)]"><i data-lucide="x" class="w-4 h-4"></i></button>
                ${body}
            </div>
        </div>`;
    }

    function renderGaugeCard(label, value, sublabel, colorVar, key) {
        const pct = Math.max(0, Math.min(100, value));
        return `
        <div onclick="showDashboardDetail('gauge', '${key}')" class="tech-border bg-[var(--color-panel)] p-4 flex flex-col justify-between cursor-pointer hover:border-[var(--color-cyan)] transition-colors">
            <div>
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase border-b border-[var(--color-panel-border)] pb-1 mb-2">${label}</div>
                <div class="text-3xl font-bold static-glow mb-1" style="color: var(${colorVar});">${pct.toFixed(1)}%</div>
                <div class="text-xs text-white">${sublabel}</div>
            </div>
            <div class="mt-4">
                <div class="h-2 w-full bg-black border border-[var(--color-panel-border)] overflow-hidden">
                    <div class="h-full transition-all duration-700" style="width: ${pct}%; background: var(${colorVar}); box-shadow: 0 0 10px var(${colorVar});"></div>
                </div>
            </div>
        </div>`;
    }

    function renderDashboardApp() {
        const ts = state.telemetryStats;

        const anomalyBars = DB_ANOMALIES.map(a => {
            const m = a.limit.match(/(\d+)\s*\/\s*(\d+)/);
            const held = m ? parseInt(m[1], 10) : 0;
            const cap = m ? parseInt(m[2], 10) : 1;
            const pct = a.limit === 'Unlimited' ? 100 : Math.round((held / cap) * 100);
            return `
                <div onclick="showDashboardDetail('anomaly', '${a.class}')" class="flex items-center gap-2 text-[10px] cursor-pointer group">
                    <div class="w-14 shrink-0 text-[var(--color-text-dim)] uppercase group-hover:text-[var(--color-cyan)] transition-colors">${a.class}</div>
                    <div class="flex-1 h-2 bg-black border border-[var(--color-panel-border)] overflow-hidden group-hover:border-[var(--color-cyan)] transition-colors">
                        <div class="h-full ${pct > 0 ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-cyan-dim)] opacity-30'}" style="width: ${pct}%;"></div>
                    </div>
                    <div class="w-16 shrink-0 text-right text-white font-bold">${a.limit}</div>
                </div>`;
        }).join('');

        const facilityKeys = Object.keys(DB_FACILITIES);
        const facilityCards = facilityKeys.map((key, i) => {
            const fac = DB_FACILITIES[key];
            const alertRoom = fac.levels.some(l => l.rooms.some(r => r.alert));
            const latency = 4 + Math.round(Math.random() * 22) + (key === 'streymoy' ? 0 : 8);
            return `
                <div onclick="showDashboardDetail('facility', '${key}')" class="border ${alertRoom ? 'border-[var(--color-amber)] border-opacity-50' : 'border-[var(--color-panel-border)]'} p-2 bg-black/50 cursor-pointer hover:border-[var(--color-cyan)] transition-colors">
                    <div class="text-xs font-bold text-white mb-1 truncate">${fac.shortName}</div>
                    <div class="text-[10px] ${alertRoom ? 'text-[var(--color-amber)]' : 'text-[var(--color-cyan)]'} flex items-center gap-1 mb-1.5">
                        <span class="w-1.5 h-1.5 rounded-full ${alertRoom ? 'bg-[var(--color-amber)] animate-ping' : 'bg-[var(--color-cyan)]'}"></span>
                        ${alertRoom ? 'EXPEDITION ACTIVE' : 'ONLINE'}
                    </div>
                    <div class="grid grid-cols-2 gap-x-2 text-[9px] text-[var(--color-text-dim)]">
                        <span>RELAY LATENCY</span><span class="text-right text-white">${latency}ms</span>
                        <span>PERSONNEL</span><span class="text-right text-white">${fac.personnel}</span>
                    </div>
                </div>`;
        }).join('');

        const logHtml = state.telemetryLog.map((line, i) => {
            const isWarn = /WARN|ANOMALOUS|ELEVATED/i.test(line);
            return `<div class="${isWarn ? 'text-[var(--color-amber)]' : ''}">${line}</div>`;
        }).join('');

        return `
        <div class="relative w-full h-full">
        <div class="w-full h-full p-4 grid grid-cols-2 md:grid-cols-3 gap-4 font-mono-tech bg-[var(--color-bg)] overflow-y-auto custom-scrollbar" data-scroll-id="dashboard-main">
            ${renderGaugeCard('Systems / Processor', ts.processor, 'Photonic Array Optimal', '--color-cyan', 'processor')}
            ${renderGaugeCard('Crystalline Resonance', ts.resonance, 'Lattice Stability Nominal', '--color-amber', 'resonance')}
            ${renderGaugeCard('Relay Network Throughput', ts.relay, 'Inter-Holding Uplink', '--color-cyan', 'relay')}

            <div class="col-span-2 md:col-span-2 tech-border bg-[var(--color-panel)] p-4 relative overflow-hidden">
                <div class="absolute inset-0 bg-grid opacity-20"></div>
                <div class="relative z-10 flex justify-between h-full flex-col">
                    <div class="flex justify-between items-start border-b border-[var(--color-panel-border)] pb-1 mb-2">
                        <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase">Global Rift Duration Trending (30 Days)</div>
                        <div class="text-[10px] text-[var(--color-amber)] animate-flicker">WARNING: DELTA DETECTED</div>
                    </div>
                    <div class="flex-1 flex items-end gap-1 h-24 pt-2">
                        ${Array.from({length: 30}).map((_, i) => {
                            const h = 20 + (i * 2) + (Math.random() * 20);
                            const color = h > 70 ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-cyan-dim)]';
                            return `<div class="flex-1 ${color}" style="height: ${Math.min(100, h)}%"></div>`;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div class="col-span-2 md:col-span-1 tech-border bg-[var(--color-panel)] p-4">
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase border-b border-[var(--color-panel-border)] pb-1 mb-3">Anomaly Containment Capacity</div>
                <div class="flex flex-col gap-2">${anomalyBars}</div>
            </div>

            <div class="col-span-2 md:col-span-3 tech-border bg-[var(--color-panel)] p-4">
                <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase border-b border-[var(--color-panel-border)] pb-1 mb-4">Facility Uplink Status</div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${facilityCards}</div>
            </div>

            <div class="col-span-2 md:col-span-3 border border-[var(--color-panel-border)] bg-black p-2 h-28 overflow-y-auto custom-scrollbar text-[10px] font-mono-tech text-[var(--color-text-dim)]" data-scroll-id="dashboard-log">
                <div class="text-[var(--color-cyan-dim)] opacity-50 sticky top-0 bg-black">SYSTEM_DIAGNOSTIC_LOG // LIVE // newest first</div>
                ${logHtml}
            </div>
        </div>
        ${renderDashboardDetailOverlay()}
        </div>`;
    }

    function classifyBadgeClass(c) {
        if (!c) return 'classify-unclassified';
        const u = c.toUpperCase();
        if (u.includes('OMEGA')) return 'classify-omega';
        if (u.includes('LEVEL 5')) return 'classify-level5';
        if (u.includes('LEVEL 4')) return 'classify-level4';
        if (u.includes('RESTRICTED')) return 'classify-restricted';
        return 'classify-unclassified';
    }

    function precedenceBadgeClass(p) {
        if (!p) return 'precedence-routine';
        const u = p.toUpperCase();
        if (u === 'FLASH') return 'precedence-flash';
        if (u === 'PRIORITY') return 'precedence-priority';
        return 'precedence-routine';
    }

    window.toggleAttachment = function(id) {
        state.openAttachments[id] = !state.openAttachments[id];
        update();
    };

    function renderMessagesApp() {
        const selected = DB_MESSAGES.find(m => m.id === state.selectedMessage);

        const listHtml = DB_MESSAGES.map(msg => {
            const isSel = msg.id === state.selectedMessage;
            const precClass = precedenceBadgeClass(msg.precedence);
            const borderColor = precClass === 'precedence-flash' ? 'border-l-[var(--color-red)]' : precClass === 'precedence-priority' ? 'border-l-[var(--color-amber)]' : (isSel ? 'border-l-[var(--color-cyan)]' : 'border-l-transparent');
            return `
            <div onclick="state.selectedMessage = '${msg.id}'; update()" class="p-3 border-b border-[var(--color-panel-border)] cursor-pointer hover:bg-[var(--color-panel-border)] ${isSel ? 'bg-[var(--color-panel-border)]' : ''} border-l-2 ${borderColor} transition-colors">
                <div class="flex justify-between items-center text-[9px] font-mono-tech text-[var(--color-cyan-dim)] mb-1.5">
                    <span class="classify-badge ${classifyBadgeClass(msg.classification)}" style="font-size:8px; padding:1px 5px;">${msg.classification}</span>
                    <span>${msg.date}</span>
                </div>
                <div class="text-xs font-bold text-white truncate mb-1">${msg.subject}</div>
                <div class="flex items-center justify-between gap-2">
                    <span class="text-[10px] text-[var(--color-text-dim)] truncate">${msg.from}</span>
                    ${msg.attachments && msg.attachments.length ? `<i data-lucide="paperclip" class="w-3 h-3 text-[var(--color-cyan-dim)] shrink-0"></i>` : ''}
                </div>
            </div>
        `; }).join('');

        let detailHtml = `<div class="w-full h-full flex items-center justify-center text-[10px] text-[var(--color-text-dim)] uppercase tracking-widest font-mono-tech">No message selected</div>`;

        if (selected) {
            const attachmentsHtml = (selected.attachments && selected.attachments.length) ? `
                <div class="mt-5 pt-3 border-t border-[var(--color-panel-border)]">
                    <div class="text-[10px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <i data-lucide="paperclip" class="w-3 h-3"></i> Attachments (${selected.attachments.length})
                    </div>
                    <div class="flex flex-col gap-2">
                        ${selected.attachments.map(att => {
                            const isOpen = !!state.openAttachments[att.id];
                            return `
                            <div>
                                <div onclick="toggleAttachment('${att.id}')" class="attachment-chip ${isOpen ? 'open' : ''}">
                                    <i data-lucide="file-text" class="w-3.5 h-3.5 text-[var(--color-cyan-dim)] shrink-0"></i>
                                    <span class="flex-1 text-[10px] text-white truncate">${att.name}</span>
                                    <span class="classify-badge ${classifyBadgeClass(att.classification)}" style="font-size:8px; padding:1px 5px;">${att.classification}</span>
                                    <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-3.5 h-3.5 text-[var(--color-cyan-dim)] shrink-0"></i>
                                </div>
                                ${isOpen ? `
                                <div class="attachment-viewer">
                                    <div class="doc-sheet">
                                        <div class="doc-stamp" style="top: 10px; right: -4px;">${att.classification}</div>
                                        <div class="doc-sheet-header">
                                            <div>
                                                <div class="doc-sheet-field-label">Classification</div>
                                                <div class="doc-sheet-field-value">${att.classification}</div>
                                            </div>
                                            <div>
                                                <div class="doc-sheet-field-label">File ID</div>
                                                <div class="doc-sheet-field-value" style="font-size:10px;">${att.name}</div>
                                            </div>
                                            <div>
                                                <div class="doc-sheet-field-label">Origin</div>
                                                <div class="doc-sheet-field-value" style="font-size:10px;">${selected.from}</div>
                                            </div>
                                        </div>
                                        <div class="doc-sheet-body whitespace-pre-wrap">${att.content}</div>
                                        <div class="doc-sheet-footer">This document may not be shared with or accessed by personnel below the designated clearance level</div>
                                    </div>
                                </div>` : ''}
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            ` : '';

            detailHtml = `
            <div class="flex flex-col bg-[var(--color-panel)] font-mono-tech p-4">
                <div class="msg-routing-block sticky top-0 z-10 mb-4">
                    <div class="flex flex-wrap items-center gap-2 mb-2.5">
                        <span class="classify-badge ${classifyBadgeClass(selected.classification)}">${selected.classification}</span>
                        <span class="precedence-badge ${precedenceBadgeClass(selected.precedence)}">${selected.precedence === 'FLASH' ? '⚡ ' : ''}${selected.precedence}</span>
                    </div>
                    <div class="grid grid-cols-[46px_1fr] text-xs gap-y-1">
                        <span class="text-[var(--color-cyan-dim)]">FM:</span> <span class="text-white">${selected.from}</span>
                        <span class="text-[var(--color-cyan-dim)]">TO:</span> <span class="text-[var(--color-text-dim)]">${selected.to}</span>
                        <span class="text-[var(--color-cyan-dim)]">DTG:</span> <span class="text-[var(--color-text-dim)]">${selected.date}</span>
                    </div>
                    <div class="mt-3 pt-2 border-t border-[var(--color-panel-border)] text-sm font-bold text-[var(--color-cyan)]">${selected.subject}</div>
                </div>
                <div class="text-sm text-[var(--color-text-dim)] whitespace-pre-wrap leading-relaxed">
                    ${selected.body}
                </div>
                ${attachmentsHtml}
            </div>`;
        }

        return `
        <div class="w-full h-full flex flex-col md:flex-row">
            <div class="w-full md:w-1/3 md:min-w-[220px] mobile-cap md:h-full bg-black border-b md:border-b-0 md:border-r border-[var(--color-panel-border)] overflow-y-auto custom-scrollbar" data-scroll-id="messages-list">
                ${listHtml}
            </div>
            <div class="flex-1 min-h-0 md:h-full overflow-y-auto custom-scrollbar" data-scroll-id="messages-detail">
                ${detailHtml}
            </div>
        </div>`;
    }

    render();
