const DB_TIER_LABELS = {
        1: 'TIER 1 // APEX COMMAND',
        2: 'TIER 2 // DIVISION LEADERSHIP',
        3: 'TIER 3 // DEPUTY & ASSISTANT DIRECTORS',
        4: 'TIER 4 // SENIOR SPECIALISTS',
        5: 'TIER 5 // OPERATIONAL SPECIALISTS',
        6: 'TIER 6 // FIELD & OPERATIONAL PERSONNEL',
        7: 'TIER 7 // SUPPORT & ASSOCIATE STAFF'
    };

    const DB_RANKS = [
        {
            id: 'r1', title: 'Directorate Council', tier: 1, department: 'Command', clearance: 'Omega', address: 'Councilor',
            desc: 'The absolute governing body of the Meridian, composed of senior administrators, founding researchers, and surviving former Commission personnel who escaped the Culling. The Council rarely meets in person; most sessions are conducted via encrypted crystalline relay between Streymoy and undisclosed secondary locations. They set research priorities, approve or veto contact with outside organizations, and hold sole authority to invoke the standing directive: "The Meridian must survive, even if its members do not."',
            privileges: ['Unrestricted Archive Access (including pre-Culling Commission records)', 'Facility Lockdown & Purge Override, all sites', 'Sanctioning of Class 5/6 Anomaly Acquisition', 'Final authority on Continuance liaison contact'],
            uniform: 'Director-class obsidian lab coat with crimson shoulder barring and geometric crystalline insignias. Council members are rarely seen outside the Deep Sub-Level of Streymoy HQ, and overt rank display is mandated only within secure command spaces.',
            plaqueTop: ['red','red','red','red','red','red'], plaqueBottom: ['red','red','red','red','red','red'], cylinders: 4
        },
        {
            id: 'r2', title: 'Executive Director', tier: 1, department: 'External & Diplomatic Command', clearance: 'Omega', address: 'Director',
            desc: 'The single highest-standing office outside the Council itself, and the Meridian\'s apex field-and-diplomatic authority. The Executive Director commands the entire front-organization network, personally maintains the delicate, wary channel of communication with the Continuance, and answers to no one within the Directorate but the Council. Very few people outside the Meridian know the Executive Director\'s true identity; fewer still know they answer to the Council at all.',
            privileges: ['Global front-organization command authority', 'Direct diplomatic line to Continuance liaisons', 'Tier-1 asset & funding reallocation across all holdings', 'Authority to disavow and sever any front organization', 'Emergency operational authority in the Council\'s absence'],
            uniform: 'Baseline corporate attire, indistinguishable from any executive in the legitimate research and biotech world, internally reinforced with kinetic-dampening fabric and a concealed crystalline authentication key.',
            plaqueTop: ['blue','blue','blue','amber','amber','amber'], plaqueBottom: ['blue','blue','blue','red','red','red'], cylinders: 4
        },

        {
            id: 'r3', title: 'Director, Department of Rift Dynamics', tier: 2, department: 'Rift Dynamics', clearance: 'Level 5', address: 'Director',
            desc: 'Oversees all study of Rift formation, behavior, duration, and geographic distribution. Since the late 2020s this office has become the most-watched seat on the Council\'s briefing schedule, as its models are the primary source for the Directorate\'s central concern: the accelerating size and duration of new manifestations.',
            privileges: ['Class 4 anomaly data access', 'Authorization of long-duration Rift monitoring deployments', 'Direct reporting line to the Directorate Council'],
            uniform: 'Sterile white lab coat with a double cyan division armband and a small crystalline duration-tracker worn at the collar.',
            plaqueTop: ['cyan','cyan','cyan','cyan','cyan'], cylinders: 2
        },
        {
            id: 'r4', title: 'Director, Department of Anomalous Biology', tier: 2, department: 'Anomalous Biology', clearance: 'Level 5', address: 'Director',
            desc: 'Leads research into Riftborn physiology, anomalous ecosystems, and biological hazards recovered from Rift environments. This office maintains the Meridian\'s most extensive contact with Riftborn communities and is responsible for the ethical protocols governing study of sapient anomalous life, a legacy of the Guangzhou misidentification of 2009.',
            privileges: ['Class 4 anomaly data access', 'Riftborn liaison authorization', 'Containment protocol design for biological hazards'],
            uniform: 'Sterile white lab coat, double cyan armband, biohazard-rated undersuit worn beneath during field assessments.',
            plaqueTop: ['cyan','cyan','cyan','cyan','dark'], cylinders: 2
        },
        {
            id: 'r5', title: 'Director, Department of Materials Science', tier: 2, department: 'Materials Science', clearance: 'Level 5', address: 'Director',
            desc: 'Directs research into Rift-derived materials and their industrial, medical, and computational applications. This office has grown enormously in influence since the Rift Age, and privately maintains the Directorate\'s most complete file on weaponized anomalous materials, including a standing watch brief on the Kashmir Exclusion Zone.',
            privileges: ['Class 4 anomaly data access', 'Materials export sign-off for front-organization commercial use', 'Weaponization threat assessment authority'],
            uniform: 'Sterile white lab coat, double cyan armband with an amber materials-hazard stripe.',
            plaqueTop: ['cyan','cyan','cyan','cyan','amber'], cylinders: 2
        },
        {
            id: 'r6', title: 'Director, Meridian Systems', tier: 2, department: 'Meridian Systems', clearance: 'Level 5', address: 'Director',
            desc: 'Commands the Directorate\'s computing infrastructure, communications network, and experimental crystalline data systems. This office designed the distinctive retro-housed analog-buffer architecture that lets Meridian terminals process anomalous data without the corruption failures that plague conventional systems.',
            privileges: ['Mainframe root authority, all facilities', 'Network hardware rerouting', 'Global surveillance grid oversight'],
            uniform: 'Antistatic coveralls with grounding tethers and a blue systems-division armband, non-magnetic tool rig at all times.',
            plaqueTop: ['blue','blue','blue','blue','blue'], cylinders: 2
        },
        {
            id: 'r7', title: 'Archivist Prime', tier: 2, department: 'Historical Archives', clearance: 'Level 4 (Restricted)', address: 'Archivist',
            desc: 'Head of the Historical Archives Division and custodian of the recovered Commission records that survived the Culling. The Archivist Prime cross-references pre-2007 incidents against modern Rift behavior, and personally controls every request to view material predating Disclosure. They are among the few living Meridian officers who have read the complete, unredacted Culling-era archive.',
            privileges: ['Pre-Culling database access, unrestricted', 'Sole authority to declassify historical material', 'Inert artifact handling and cataloguing'],
            uniform: 'Dark grey utilitarian jumpsuit designed to minimize photonic dust accumulation among the analog archive servers.',
            plaqueTop: ['cyan','cyan','dark','dark','dark'], cylinders: 2
        },
        {
            id: 'r8', title: 'Expedition Commander', tier: 2, department: 'Expeditionary Division', clearance: 'Level 5', address: 'Commander',
            desc: 'Head of the Expeditionary Division, responsible for personnel, logistics, and operations across every long-duration research expedition the Meridian conducts. Once a team crosses a Rift threshold, the presiding Expedition Commander (or their designated Senior Expedition Officer) holds absolute field authority, answerable only to the Council on return.',
            privileges: ['Field martial law authority during active expeditions', 'Heavy armory requisition', 'Submersible and rover deployment across all holdings'],
            uniform: 'Reinforced environmental hazard suit in amber and black, with hardened bio-monitors integrated into the forearms.',
            plaqueTop: ['amber','amber','amber','amber','amber'], cylinders: 2
        },
        {
            id: 'r9', title: 'Director, Security & Information Division', tier: 2, department: 'Security & Information', clearance: 'Level 5 (Restricted)', address: 'Director',
            desc: 'Responsible for the protection of Meridian personnel, facilities, research, and identities across every holding. This office manages the organization\'s compartmentalization, administers cover identities for front-organization staff, and runs the internal counter-intelligence programs that keep the Meridian invisible to governments, corporations, and the Continuance alike.',
            privileges: ['Lethal force authorization, all sites', 'Interrogation and internal-leak investigation protocols', 'Access log auditing across every division'],
            uniform: 'Matte black tactical dress with layered ablative plating and a polarized visor rated against memetic anomalous hazards.',
            plaqueTop: ['red','amber','amber','dark','dark'], cylinders: 2
        },
        {
            id: 'r10', title: 'Director, External Operations Division', tier: 2, department: 'External Operations', clearance: 'Level 5', address: 'Director',
            desc: 'Maintains the sprawling network of shell corporations, academic partnerships, research foundations, and contractor relationships that let the Meridian operate in plain sight. Only a handful of people can trace the full chain connecting any single front organization back to Streymoy, and this office is the only one that holds the complete map.',
            privileges: ['Front-organization creation and dissolution authority', 'Cover-funding routing across all shell entities', 'Contractor vetting sign-off'],
            uniform: 'Tailored corporate attire matched to whichever front organization the officer is currently representing; no standing Meridian insignia is worn in public.',
            plaqueTop: ['dark','dark','red','red','dark'], cylinders: 2
        },

        {
            id: 'r20', title: 'Deputy Executive Director', tier: 3, department: 'External & Diplomatic Command', clearance: 'Level 5', address: 'Deputy Director',
            desc: 'Acts in the Executive Director\'s name across the front-organization network when the Director is in transit, in closed session with the Council, or otherwise unreachable. The Deputy holds full signing authority over front-organization matters but cannot independently approve Continuance contact.',
            privileges: ['Front-organization command authority in the Director\'s absence', 'Emergency funding reallocation, Tier-2 assets', 'Standing invitation to Council briefings, non-voting'],
            uniform: 'Baseline corporate attire matching the Executive Director\'s office, without the concealed authentication key reserved for the Director alone.',
            plaqueTop: ['red','red','red','red'], cylinders: 3
        },
        {
            id: 'r21', title: 'Deputy Director, Department of Rift Dynamics', tier: 3, department: 'Rift Dynamics', clearance: 'Level 4', address: 'Deputy Director',
            desc: 'Manages the day-to-day operation of the Rift Dynamics department, freeing the Director to focus on Council-level briefings. Chairs the weekly duration-trend review and signs off on monitoring deployments below the threshold requiring the Director\'s personal authorization.',
            privileges: ['Class 4 anomaly data access', 'Monitoring deployment sign-off, standard duration', 'Acting Director authority in the Director\'s absence'],
            uniform: 'Sterile white lab coat, single cyan division armband with a deputy bar.',
            plaqueTop: ['cyan','cyan','cyan','cyan'], cylinders: 1
        },
        {
            id: 'r22', title: 'Deputy Director, Department of Anomalous Biology', tier: 3, department: 'Anomalous Biology', clearance: 'Level 4', address: 'Deputy Director',
            desc: 'Oversees active Riftborn liaison casework and biological hazard containment protocol review on the Director\'s behalf, and is typically the first call when a field assessment requires an on-site decision outside normal hours.',
            privileges: ['Class 4 anomaly data access', 'Riftborn liaison authorization, routine cases', 'Containment protocol review sign-off'],
            uniform: 'Sterile white lab coat, single cyan armband with a deputy bar, biohazard undersuit on call.',
            plaqueTop: ['cyan','cyan','cyan','dark'], cylinders: 1
        },
        {
            id: 'r23', title: 'Deputy Director, Department of Materials Science', tier: 3, department: 'Materials Science', clearance: 'Level 4', address: 'Deputy Director',
            desc: 'Runs the department\'s commercial export review queue and maintains the working file on weaponized-materials watch briefs between the Director\'s periodic escalations to Security & Information.',
            privileges: ['Class 4 anomaly data access', 'Materials export sign-off, routine shipments', 'Watch brief maintenance authority'],
            uniform: 'Sterile white lab coat, single cyan armband with an amber hazard stripe and deputy bar.',
            plaqueTop: ['cyan','cyan','cyan','amber'], cylinders: 1
        },
        {
            id: 'r24', title: 'Deputy Director, Meridian Systems', tier: 3, department: 'Meridian Systems', clearance: 'Level 4', address: 'Deputy Director',
            desc: 'Handles the department\'s routine hardware rerouting requests and supervises the Photonic Fabrication Bay\'s production schedule, escalating only mainframe-root-level changes to the Director.',
            privileges: ['Facility-level hardware rerouting', 'Fabrication schedule authority', 'Local surveillance grid monitoring'],
            uniform: 'Antistatic coveralls with a blue systems armband and deputy bar.',
            plaqueTop: ['blue','blue','blue','blue'], cylinders: 1
        },
        {
            id: 'r25', title: 'Deputy Archivist', tier: 3, department: 'Historical Archives', clearance: 'Level 4 (Restricted)', address: 'Deputy Archivist',
            desc: 'Handles routine reading-room requests and cross-referencing work so the Archivist Prime can focus on Culling-era material. Cannot independently declassify anything, but maintains the request queue for items that eventually reach the Archivist Prime\'s desk.',
            privileges: ['Standard-era archive access, unrestricted', 'Cross-reference request triage', 'Reading room supervision authority'],
            uniform: 'Dark grey utilitarian jumpsuit, single cyan deputy bar at the collar.',
            plaqueTop: ['cyan','dark','dark','dark'], cylinders: 1
        },
        {
            id: 'r26', title: 'Deputy Expedition Commander', tier: 3, department: 'Expeditionary Division', clearance: 'Level 4', address: 'Deputy Commander',
            desc: 'Runs staging and logistics for expeditions the Commander is not personally leading, and assumes full field authority automatically if the presiding Commander is incapacitated beyond a Rift threshold.',
            privileges: ['Field authority, delegated expeditions', 'Standard armory requisition', 'Submersible and rover deployment sign-off'],
            uniform: 'Reinforced environmental hazard suit in amber and black, deputy bar over the left shoulder.',
            plaqueTop: ['amber','amber','amber','amber'], cylinders: 1
        },
        {
            id: 'r27', title: 'Deputy Director, Security & Information Division', tier: 3, department: 'Security & Information', clearance: 'Level 4 (Restricted)', address: 'Deputy Director',
            desc: 'Manages the day-to-day compartmentalization workload, cover identity issuance, and routine internal audits, reserving lethal-force authorization escalations and cross-holding investigations for the Director.',
            privileges: ['Cover identity issuance authority', 'Routine access log auditing', 'Interrogation protocol oversight, non-lethal cases'],
            uniform: 'Matte black tactical dress with a deputy bar over standard plating.',
            plaqueTop: ['red','amber','dark','dark'], cylinders: 1
        },
        {
            id: 'r28', title: 'Deputy Director, External Operations Division', tier: 3, department: 'External Operations', clearance: 'Level 4', address: 'Deputy Director',
            desc: 'Maintains the routine health of the front-organization network - budget checks, handler performance reviews, contractor renewals - leaving only new front creation and dissolution decisions to the Director.',
            privileges: ['Front-organization budget review authority', 'Handler performance evaluation', 'Contractor renewal sign-off'],
            uniform: 'Tailored corporate attire matched to whichever front organization the officer is currently representing.',
            plaqueTop: ['dark','red','dark','dark'], cylinders: 1
        },

        {
            id: 'r11', title: 'Senior Researcher', tier: 4, department: 'Advanced Research', clearance: 'Level 4', address: 'Researcher',
            desc: 'Leads individual research initiatives within Rift Dynamics, Anomalous Biology, or Materials Science under the authority of their Division Director. Senior Researchers interpret raw telemetry from photonic and crystalline systems, draft the Directorate\'s internal white papers, and are typically the most senior scientist physically present during a controlled anomaly test.',
            privileges: ['Class 3 anomaly handling authorization', 'Expedition team drafting (research seats)', 'Laboratory protocol override within their project'],
            uniform: 'Sterile white lab coat with a single cyan armband, badge displayed on the right breast.',
            plaqueTop: ['cyan','cyan','cyan'], cylinders: 1
        },
        {
            id: 'r12', title: 'Systems Architect', tier: 4, department: 'Meridian Systems', clearance: 'Level 4', address: 'Architect',
            desc: 'Builds and maintains the Directorate\'s distinctive computational technology, from photonic processors to the analog CRT buffers that shield crystalline subsystems from anomalous data corruption. Systems Architects rotate between Streymoy\'s mainframe core and field deployments where portable rigs are needed.',
            privileges: ['Facility-level hardware rerouting', 'Local surveillance grid monitoring', 'Analog buffer recalibration authority'],
            uniform: 'Antistatic coveralls, blue systems armband, specialized non-magnetic tool rig.',
            plaqueTop: ['blue','blue','blue'], cylinders: 1
        },
        {
            id: 'r13', title: 'Senior Expedition Officer', tier: 4, department: 'Expeditionary Division', clearance: 'Level 4', address: 'Officer',
            desc: 'Serves as second-in-command on long-duration expeditions and independently leads smaller research or recovery missions through shorter-duration Rifts. Senior Expedition Officers are trained to make containment and withdrawal calls in the field without waiting for HQ confirmation, a lesson the Division drilled hard into every officer after Kashmir.',
            privileges: ['Field command of sub-teams', 'Standard armory requisition', 'Independent withdrawal authority in acute-hazard scenarios'],
            uniform: 'Environmental hazard suit, amber and black, lighter-weight variant of the Commander\'s issue.',
            plaqueTop: ['amber','amber','amber'], cylinders: 1
        },
        {
            id: 'r14', title: 'Senior Security Operative', tier: 4, department: 'Security & Information', clearance: 'Level 4 (Restricted)', address: 'Officer',
            desc: 'Runs security details for a single facility or expedition under the Division Director\'s authority, manages junior operatives, and personally administers cover-identity briefings for staff being placed inside a front organization.',
            privileges: ['Facility perimeter command', 'Cover identity issuance', 'Internal audit authority within their post'],
            uniform: 'Matte black tactical dress, single red rank stripe over standard plating.',
            plaqueTop: ['red','amber','dark'], cylinders: 1
        },
        {
            id: 'r29', title: 'Senior Archivist', tier: 4, department: 'Historical Archives', clearance: 'Level 3 (Restricted)', address: 'Archivist',
            desc: 'Handles the physical conservation and cataloguing of recovered Commission material, and is usually the first person to notice when a newly recovered fragment might cross-reference against something already on file.',
            privileges: ['Standard-era archive access, unrestricted', 'Physical conservation authority', 'Cataloguing sign-off'],
            uniform: 'Dark grey utilitarian jumpsuit, conservation gloves carried at all times.',
            plaqueTop: ['dark','dark','dark'], cylinders: 1
        },

        {
            id: 'r30', title: 'Researcher', tier: 5, department: 'Advanced Research', clearance: 'Level 3', address: 'Researcher',
            desc: 'A fully qualified scientist running their own experiment queue under a Senior Researcher\'s supervision. Sits between the entry-level Field Researcher and the project-leading Senior Researcher, and is usually the one actually at the bench when a controlled anomaly test happens.',
            privileges: ['Class 2 anomaly handling authorization', 'Standard laboratory requisition', 'Field telemetry upload access'],
            uniform: 'Sterile white lab coat with a single cyan armband.',
            plaqueTop: ['cyan','cyan'], cylinders: 0
        },
        {
            id: 'r31', title: 'Systems Engineer', tier: 5, department: 'Meridian Systems', clearance: 'Level 3', address: 'Engineer',
            desc: 'Maintains local hardware installations under a Systems Architect\'s direction, handling the routine recalibration and diagnostics that keep a facility\'s analog buffers within tolerance.',
            privileges: ['Local hardware diagnostics', 'Buffer recalibration, routine cycle', 'Equipment requisition, standard'],
            uniform: 'Antistatic coveralls, blue systems armband.',
            plaqueTop: ['blue','blue'], cylinders: 0
        },
        {
            id: 'r32', title: 'Expedition Officer', tier: 5, department: 'Expeditionary Division', clearance: 'Level 3', address: 'Officer',
            desc: 'Leads individual sub-teams within a larger expedition under a Senior Expedition Officer\'s command, and is typically the officer physically present at the threshold when a team crosses over.',
            privileges: ['Sub-team field command', 'Standard armory requisition', 'Withdrawal recommendation authority'],
            uniform: 'Environmental hazard suit, amber and black, standard-issue.',
            plaqueTop: ['amber','amber'], cylinders: 0
        },
        {
            id: 'r33', title: 'Intelligence Analyst', tier: 5, department: 'Security & Information', clearance: 'Level 3 (Restricted)', address: 'Analyst',
            desc: 'Handles the desk work behind compartmentalization - cross-referencing clearance histories, flagging inconsistent cover stories, and drafting the reports a Senior Security Operative eventually acts on. Rarely carries a weapon; carries a great deal of institutional knowledge instead.',
            privileges: ['Access log review, routine', 'Cover identity cross-reference authority', 'Internal report drafting'],
            uniform: 'Matte black business dress, no plating, single red analyst pin.',
            plaqueTop: ['red','dark'], cylinders: 0
        },
        {
            id: 'r34', title: 'External Operations Coordinator', tier: 5, department: 'External Operations', clearance: 'Level 3', address: 'Coordinator',
            desc: 'Supports a Handler across two or three smaller front organizations at once, managing paperwork, local hiring, and the small day-to-day fires that don\'t need to reach the Deputy Director\'s desk.',
            privileges: ['Local hiring authority, cover positions', 'Front-organization budget tracking', 'Escalation drafting to Handler'],
            uniform: 'Whatever attire matches the cover organization; no Meridian insignia carried on person.',
            plaqueTop: ['dark','dark'], cylinders: 0
        },

        {
            id: 'r15', title: 'Field Researcher', tier: 6, department: 'Advanced Research', clearance: 'Level 3', address: 'Researcher',
            desc: 'The backbone of the Meridian\'s scientific work. Conducts primary observation, sample collection, and controlled experimentation under the supervision of a Senior Researcher, and is usually the first Meridian scientist to lay eyes on a newly opened long-duration Rift.',
            privileges: ['Basic lab requisition', 'Class 2 anomaly handling', 'Field telemetry upload access'],
            uniform: 'Sterile white lab coat with a single thin cyan armband.',
            plaqueTop: ['cyan'], cylinders: 1
        },
        {
            id: 'r16', title: 'Security Operative', tier: 6, department: 'Security & Information', clearance: 'Level 3', address: 'Operative',
            desc: 'Protects Meridian personnel and facilities on the ground, and is the most common uniformed presence a visiting researcher or contractor will actually encounter. Operatives are trained to manage compartmentalized information without ever seeing the full picture themselves.',
            privileges: ['Standard-issue lethal force authorization', 'Access log reporting', 'Perimeter patrol command (junior)'],
            uniform: 'Matte black tactical gear, layered ablative plating, polarized visor.',
            plaqueTop: ['red'], cylinders: 1
        },
        {
            id: 'r17', title: 'Expedition Support Crew', tier: 6, department: 'Expeditionary Division', clearance: 'Level 3', address: 'Crew',
            desc: 'Handles logistics, equipment maintenance, and transport for expedition teams, both topside and beyond the threshold. Support Crew rarely make first contact with anomalous phenomena directly, but their work keeps every long-duration mission alive.',
            privileges: ['Equipment requisition (standard)', 'Submersible/rover maintenance access', 'Expedition staging authorization'],
            uniform: 'Reinforced coveralls in muted amber-grey with reflective safety striping.',
            plaqueTop: ['amber'], cylinders: 1
        },
        {
            id: 'r18', title: 'External Operations Handler', tier: 6, department: 'External Operations', clearance: 'Level 3', address: 'Handler',
            desc: 'Manages the day-to-day operation of a single front organization, most of whom believe they work for an ordinary research company, university, or contractor. Handlers report irregularities up the External Operations chain without ever confirming the Meridian\'s existence to the staff beneath them.',
            privileges: ['Front-organization budget management', 'Local hiring authority (cover positions)', 'Escalation channel to Division Director'],
            uniform: 'Whatever attire matches the cover organization; no Meridian insignia carried on person.',
            plaqueTop: ['dark'], cylinders: 0
        },
        {
            id: 'r35', title: 'Systems Technician', tier: 6, department: 'Meridian Systems', clearance: 'Level 2', address: 'Technician',
            desc: 'Performs hands-on maintenance, cabling, and component swaps under a Systems Engineer\'s direction. Most Technicians never see raw anomalous telemetry directly - they keep the hardware that processes it running.',
            privileges: ['Component-level maintenance access', 'Supervised buffer swap authority', 'Basic diagnostics tools'],
            uniform: 'Antistatic coveralls, no armband.',
            plaqueTop: ['blue'], cylinders: 0
        },

        {
            id: 'r19', title: 'Associate / Trainee', tier: 7, department: 'General Assignment', clearance: 'Level 2', address: 'By given name',
            desc: 'Administrative staff, junior technicians, and newly recruited personnel still completing compartmentalization training. The vast majority of the Meridian\'s roughly 30,000 personnel sit at or near this tier, and most never learn which front organization, if any, they actually serve.',
            privileges: ['Facility access, designated work areas only', 'Standard equipment use', 'No anomaly handling authorization'],
            uniform: 'Plain grey or cover-appropriate civilian attire; no rank insignia authorized.',
            plaqueTop: [], cylinders: 0
        }
    ];

    const DB_RANK_DEPARTMENTS = [
        'Command', 'External & Diplomatic Command', 'Rift Dynamics', 'Anomalous Biology',
        'Materials Science', 'Meridian Systems', 'Historical Archives', 'Expeditionary Division',
        'Security & Information', 'External Operations', 'Advanced Research', 'General Assignment'
    ];

    const DB_ANOMALIES = [
        { class: 'Class 1', limit: 'Unlimited', items: [] },
        { class: 'Class 2', limit: '0 / 5', items: [] },
        { class: 'Class 3', limit: '0 / 3', items: [] },
        { class: 'Class 4', limit: '0 / 2', items: [] },
        { class: 'Class 5', limit: '1 / 1', items: [
            {
                id: 'AN-5-001', name: 'NORTHSTAR', file: 'anomaly-an5001',
                desc: 'A 118-meter former Commission research vessel recovered beneath 2.7 kilometers of ice in northern Greenland, August 2032. Built around an experimental interaction system informally designated the Transit Core. No crew, remains, or biological material were recovered aboard.',
                containment: 'Streymoy HQ - Deep Vault, subterranean research chamber (constructed August 2032)'
            }
        ] },
        { class: 'Class 6', limit: '0 / 1', items: [] }
    ];

    const DB_FACILITIES = {
        'streymoy': {
            id: 'streymoy', name: 'Streymoy Headquarters', shortName: 'STREYMOY HQ',
            location: 'Streymoy, Faroe Islands', established: '2009', personnel: '~9,000', status: 'OMEGA SECURE',
            desc: 'The Meridian\'s principal administrative and research facility, built beneath a working North Atlantic atmospheric research station used as public cover. Contains central administration, primary laboratories, historical archives, advanced computing systems, and senior research staff.',
            levels: [
                {
                    id: 's_l1', label: 'Command Ring', depth: 'Surface / -20m',
                    rooms: [
                        { name: 'Directorate Council Chamber', status: 'LOCKED', head: 'Directorate Council', dept: 'Command', personnel: '24 (session only)', hazard: 'NONE', desc: 'The Council\'s primary meeting chamber, situated in the deepest structural ring to maximize distance from any potential containment breach elsewhere in the complex. Sessions are held infrequently and only ever in person for Omega-classification decisions.', alert: null },
                        { name: 'Council Briefing Annex', status: 'LOCKED', head: 'Directorate Council', dept: 'Command', personnel: '12 (session only)', hazard: 'NONE', desc: 'An adjoining preparation room where Division Directors assemble briefing packets before a full Council session. Nothing discussed here is considered binding until ratified in the Chamber proper.', alert: null },
                        { name: 'Executive Director\'s Office', status: 'RESTRICTED', head: 'Executive Director', dept: 'External & Diplomatic Command', personnel: '3', hazard: 'NONE', desc: 'A modest, deliberately unremarkable office used for the Executive Director\'s rare visits to Streymoy. Most diplomatic work is conducted remotely through front-organization channels.', alert: null },
                        { name: 'Secure Comms Array', status: 'ACTIVE', head: 'Meridian Systems', dept: 'Meridian Systems', personnel: '12', hazard: 'NONE', desc: 'Encrypted crystalline relay hub linking Streymoy to Iceland, Newfoundland, Scotland, and a number of undisclosed secondary sites. All Council-level traffic is routed through here.', alert: null },
                        { name: 'Personnel Records & Compartmentalization Office', status: 'RESTRICTED', head: 'Director, Security & Information Division', dept: 'Security & Information', personnel: '30', hazard: 'NONE', desc: 'Maintains the master index of who knows what. Cover identities, front-organization postings, and clearance histories for every Meridian employee are cross-referenced here before any transfer or promotion is approved.', alert: null },
                        { name: 'Surface Cover Station', status: 'ACTIVE', head: 'External Operations', dept: 'External Operations', personnel: '18', hazard: 'NONE', desc: 'The genuine, functioning atmospheric research station that conceals Streymoy HQ from casual observation. Staffed partly by personnel who have no idea what lies beneath them.', alert: null }
                    ]
                },
                {
                    id: 's_l_support', label: 'Personnel Support Ring', depth: '-40m',
                    rooms: [
                        { name: 'Medical Bay', status: 'ACTIVE', head: 'Senior Medical Officer', dept: 'General Assignment', personnel: '40', hazard: 'NONE', desc: 'Treats injuries from expeditions, laboratory incidents, and anomalous exposure. Isolation rooms adjoin the lift shaft leading down to the Anomalous Biology Containment Wing for rapid transfer of biological hazard cases.', alert: null },
                        { name: 'Environmental Systems Core', status: 'ACTIVE', head: 'Systems Architect', dept: 'Meridian Systems', personnel: '25', hazard: 'THERMAL', desc: 'Manages air recycling, geothermal power tapping, and the strict humidity control the crystalline subsystems require. A failure here threatens the whole facility, not just its comfort.', alert: null },
                        { name: 'Personnel Quarters', status: 'ACTIVE', head: 'General Assignment', dept: 'General Assignment', personnel: '3,200', hazard: 'NONE', desc: 'Long-term housing for the roughly a third of Streymoy staff who live on-site rather than commute through the surface cover town. Windowless by necessity, but well maintained.', alert: null },
                        { name: 'Mess Hall & Common Area', status: 'ACTIVE', head: 'General Assignment', dept: 'General Assignment', personnel: 'Varies', hazard: 'NONE', desc: 'The closest thing Streymoy has to neutral ground, where researchers, security personnel, and archivists who otherwise never cross paths eat in the same room.', alert: null }
                    ]
                },
                {
                    id: 's_l2', label: 'Research Core', depth: '-60m',
                    rooms: [
                        { name: 'Meridian Systems Mainframe', status: 'ACTIVE', head: 'Director, Meridian Systems', dept: 'Meridian Systems', personnel: '85', hazard: 'THERMAL', desc: 'Houses the primary photonic processors and the experimental crystalline data mainframe. Extremely low-humidity environment maintained to preserve crystal resonance; analog CRT buffer banks line the outer wall as a corruption firewall.', alert: 'THERMAL LOAD ELEVATED' },
                        { name: 'Photonic Fabrication Bay', status: 'ACTIVE', head: 'Director, Meridian Systems', dept: 'Meridian Systems', personnel: '35', hazard: 'THERMAL', desc: 'Manufactures the distinctive retro-housed CRT buffer hardware shipped to every Meridian holding. Assembly remains deliberately hands-on; automated fabrication has repeatedly introduced anomalous data corruption nobody can explain.', alert: null },
                        { name: 'Rift Dynamics Laboratory', status: 'ACTIVE', head: 'Director, Rift Dynamics', dept: 'Rift Dynamics', personnel: '60', hazard: 'DIMENSIONAL', desc: 'Analyzes telemetry feeds from every long-duration Rift the Meridian monitors. Current priority project: modeling the North Atlantic duration increase first flagged in 2032.', alert: null },
                        { name: 'Materials Science Wing', status: 'ACTIVE', head: 'Director, Materials Science', dept: 'Materials Science', personnel: '70', hazard: 'DIMENSIONAL', desc: 'Shielded observation chambers and kinetic-reversal plating for handling unstable Rift-derived compounds. Maintains a private cross-reference file on the Kashmir Exclusion Zone.', alert: null },
                        { name: 'Anomalous Biology Containment Wing', status: 'RESTRICTED', head: 'Director, Department of Anomalous Biology', dept: 'Anomalous Biology', personnel: '55', hazard: 'BIOLOGICAL', desc: 'Quarantine-capable habitats, biosafety laboratories, and consultation rooms used for both hazardous organism research and voluntary Riftborn medical assessments. Access protocols are among the strictest outside the Deep Vault.', alert: null },
                        { name: 'Historical Archives Reading Room', status: 'ACTIVE', head: 'Archivist Prime', dept: 'Historical Archives', personnel: '40', hazard: 'NONE', desc: 'Physical storage and analog terminal access for recovered pre-Culling Commission records. Digital archives are deliberately isolated from the wider Meridian network to prevent anomalous data bleed-through.', alert: null }
                    ]
                },
                {
                    id: 's_l3', label: 'Deep Vault', depth: '-140m',
                    rooms: [
                        { name: 'Class 4/5 Containment Vaults', status: 'RESTRICTED', head: 'Director, Security & Information', dept: 'Security & Information', personnel: '12', hazard: 'LETHAL', desc: 'Cryogenic vaults, Faraday cages, and nitrogen flood systems for anomalies too dangerous to study in the open. Manual access requires three-point verification; automated systems hold lethal-force authorization.', alert: 'RESTRICTED ACCESS' },
                        { name: 'Expedition Staging Bay', status: 'ACTIVE', head: 'Expedition Commander', dept: 'Expeditionary Division', personnel: '150', hazard: 'NONE', desc: 'Submersible docks, decontamination airlocks, and the primary armory. Connects directly to the moon pool used for Arctic and North Atlantic long-duration deployments.', alert: null },
                        { name: 'Council Deep Archive', status: 'RESTRICTED', head: 'Archivist Prime', dept: 'Historical Archives', personnel: '4', hazard: 'NONE', desc: 'The unredacted pre-Disclosure archive, viewable only with Council or Archivist Prime authorization. Rumored to contain material tracing back toward 1806.', alert: null },
                        { name: 'Continuance Liaison Suite', status: 'RESTRICTED', head: 'Executive Director', dept: 'External & Diplomatic Command', personnel: '2', hazard: 'NONE', desc: 'A small, deliberately isolated meeting room wired independently from the main Meridian network, used for the rare, closely monitored contact with Continuance representatives. Nothing said here is ever transcribed electronically.', alert: null },
                        { name: 'Emergency Purge Control', status: 'RESTRICTED', head: 'Director, Security & Information Division', dept: 'Security & Information', personnel: '3', hazard: 'LETHAL', desc: 'The manual override station for Directive Zero: total data purge and physical lockdown across every Meridian holding. Two-officer authorization is required even to arm the system.', alert: null }
                    ]
                }
            ]
        },
        'iceland': {
            id: 'iceland', name: 'Meridian North Atlantic Station', shortName: 'ICELAND STATION',
            location: 'Iceland', established: '2011', personnel: '~1,400', status: 'ACTIVE',
            desc: 'A remote Rift monitoring and atmospheric research station tracking anomalous activity across the North Atlantic. Serves as the staging point for expeditions traveling between Europe, Iceland, Greenland, and the Arctic, and conducts research into long-duration Rifts and unusual atmospheric phenomena.',
            levels: [
                {
                    id: 'i_l1', label: 'Surface Observatory', depth: 'Surface',
                    rooms: [
                        { name: 'Atmospheric Monitoring Array', status: 'ACTIVE', head: 'Rift Dynamics Field Team', dept: 'Rift Dynamics', personnel: '22', hazard: 'NONE', desc: 'Radar, seismic, and satellite-linked sensors tracking anomalous atmospheric behavior across the North Atlantic basin, feeding directly into Streymoy\'s Rift Dynamics Laboratory.', alert: null },
                        { name: 'Arctic Expedition Staging', status: 'ACTIVE', head: 'Senior Expedition Officer', dept: 'Expeditionary Division', personnel: '65', hazard: 'NONE', desc: 'Cold-weather equipment depot and launch point for expeditions bound for Greenland and the Arctic. Currently supporting an extended deployment tracking the 2032 duration increase.', alert: 'EXPEDITION ACTIVE' }
                    ]
                },
                {
                    id: 'i_l_support', label: 'Personnel Support Level', depth: '-15m',
                    rooms: [
                        { name: 'Station Medical Bay', status: 'ACTIVE', head: 'Senior Medical Officer', dept: 'General Assignment', personnel: '12', hazard: 'NONE', desc: 'Treats cold-weather injury, expedition trauma, and standard illness for staff too far from Streymoy for routine transfer. Stabilizes serious cases for airlift.', alert: null },
                        { name: 'Personnel Quarters', status: 'ACTIVE', head: 'General Assignment', dept: 'General Assignment', personnel: '340', hazard: 'NONE', desc: 'Insulated housing for station staff, built to withstand the North Atlantic winter with minimal reliance on surface supply runs.', alert: null }
                    ]
                },
                {
                    id: 'i_l2', label: 'Subsurface Labs', depth: '-30m',
                    rooms: [
                        { name: 'Long-Duration Rift Lab', status: 'ACTIVE', head: 'Senior Researcher', dept: 'Rift Dynamics', personnel: '30', hazard: 'DIMENSIONAL', desc: 'Dedicated to the study of Rifts that remain open for extended periods, a phenomenon that has become the Meridian\'s single largest research priority.', alert: null },
                        { name: 'Local Systems Node', status: 'ACTIVE', head: 'Systems Architect', dept: 'Meridian Systems', personnel: '14', hazard: 'THERMAL', desc: 'A scaled-down crystalline relay node keeping Iceland Station synchronized with Streymoy\'s mainframe despite the North Atlantic\'s frequent anomalous interference.', alert: null }
                    ]
                },
                {
                    id: 'i_l3', label: 'Restricted Monitoring Annex', depth: '-55m',
                    rooms: [
                        { name: 'Duration Anomaly Vault', status: 'RESTRICTED', head: 'Director, Rift Dynamics (Liaison)', dept: 'Rift Dynamics', personnel: '9', hazard: 'DIMENSIONAL', desc: 'Houses the raw sensor logs behind the 2032 duration increase, including <span class="redact" onclick="revealRedact(this)">precise coordinates for the three unlisted monitoring buoys feeding this vault directly, bypassing the public Atmospheric Monitoring Array entirely</span>. Access is limited even among Rift Dynamics staff.', alert: 'RESTRICTED ACCESS' },
                        { name: 'Arctic Relay Cache', status: 'RESTRICTED', head: 'Director, Security & Information Division', dept: 'Security & Information', personnel: '4', hazard: 'NONE', desc: 'A hardened equipment cache for the dormant relay cell referenced in Directive Zero\'s secondary fallback protocol. <span class="redact" onclick="revealRedact(this)">Its exact activation sequence is split across two officers who are never stationed at Iceland simultaneously</span>.', alert: null }
                    ]
                }
            ]
        },
        'newfoundland': {
            id: 'newfoundland', name: 'Meridian Newfoundland Facility', shortName: 'NEWFOUNDLAND HUB',
            location: 'Newfoundland and Labrador, Canada', established: '2014', personnel: '~2,100', status: 'ACTIVE',
            desc: 'The Directorate\'s principal North American research and expedition facility, positioned in a remote area to maintain distance from major population centers while granting access to the North American anomalous research network. Specializes in Rift detection, anomalous materials, and cross-continent coordination.',
            levels: [
                {
                    id: 'n_l1', label: 'Main Complex', depth: 'Surface / -15m',
                    rooms: [
                        { name: 'Rift Detection Center', status: 'ACTIVE', head: 'Rift Dynamics Field Team', dept: 'Rift Dynamics', personnel: '48', hazard: 'NONE', desc: 'Coordinates Rift detection across the North American continent, cross-referencing sightings against Meridian, government, and open-source reporting to spot manifestations before rival organizations do.', alert: null },
                        { name: 'Anomalous Materials Vault', status: 'RESTRICTED', head: 'Director, Materials Science (Liaison)', dept: 'Materials Science', personnel: '20', hazard: 'DIMENSIONAL', desc: 'Secure storage and preliminary analysis for materials recovered by North American expeditions before transfer to Streymoy for full study.', alert: null }
                    ]
                },
                {
                    id: 'n_l2', label: 'Coordination Wing', depth: '-15m',
                    rooms: [
                        { name: 'North American Liaison Office', status: 'ACTIVE', head: 'External Operations Handler', dept: 'External Operations', personnel: '30', hazard: 'NONE', desc: 'Manages the Meridian\'s continental network of shell organizations and academic partnerships, coordinating operations across North America from a comfortable distance from Streymoy.', alert: null },
                        { name: 'Expedition Preparation Bay', status: 'ACTIVE', head: 'Expedition Support Crew', dept: 'Expeditionary Division', personnel: '55', hazard: 'NONE', desc: 'Equipment staging and logistics for expeditions launched from the Newfoundland facility, supporting operations throughout the western North Atlantic.', alert: null }
                    ]
                },
                {
                    id: 'n_l_support', label: 'Personnel Support Level', depth: '-25m',
                    rooms: [
                        { name: 'Facility Medical Bay', status: 'ACTIVE', head: 'Senior Medical Officer', dept: 'General Assignment', personnel: '22', hazard: 'NONE', desc: 'Handles injury and illness for on-site staff, with an isolation suite adjoining the materials transfer corridor for suspected exposure cases.', alert: null },
                        { name: 'Personnel Quarters', status: 'ACTIVE', head: 'General Assignment', dept: 'General Assignment', personnel: '640', hazard: 'NONE', desc: 'On-site housing for roughly a third of Newfoundland staff, positioned well clear of the Materials Vault and its transfer corridor.', alert: null }
                    ]
                },
                {
                    id: 'n_l3', label: 'Materials Deep Storage', depth: '-45m',
                    rooms: [
                        { name: 'Ledger Recovery Archive', status: 'RESTRICTED', head: 'Archivist Prime (Liaison)', dept: 'Historical Archives', personnel: '3', hazard: 'NONE', desc: 'Climate-controlled storage for the partial pre-1908 ledger recovered during a Newfoundland materials transfer, pending Council review. <span class="redact" onclick="revealRedact(this)">The exact transfer shipment it was found packed inside has been deliberately omitted from the shipping manifest on file</span>.', alert: null },
                        { name: 'Deep Materials Vault', status: 'RESTRICTED', head: 'Director, Materials Science (Liaison)', dept: 'Materials Science', personnel: '11', hazard: 'DIMENSIONAL', desc: 'Overflow containment for anomalous materials awaiting transfer to Streymoy. <span class="redact" onclick="revealRedact(this)">Two crates currently held here are flagged with a Kashmir-pattern weaponization signature and have not yet been logged in the department\'s public-facing inventory</span>.', alert: 'RESTRICTED ACCESS' }
                    ]
                }
            ]
        },
        'scotland': {
            id: 'scotland', name: 'Meridian Field Station', shortName: 'SCOTLAND BASE',
            location: 'Scotland, United Kingdom', established: '2012', personnel: '~600', status: 'ACTIVE',
            desc: 'A smaller European research and expedition facility used for anomalous research, equipment development, academic cooperation, and liaison with universities and independent researchers. Provides logistical support for Meridian personnel traveling throughout Europe.',
            levels: [
                {
                    id: 'sc_l1', label: 'Academic Wing', depth: 'Surface',
                    rooms: [
                        { name: 'University Liaison Office', status: 'ACTIVE', head: 'External Operations Handler', dept: 'External Operations', personnel: '10', hazard: 'NONE', desc: 'Maintains cover partnerships with several university geology and physics departments, providing plausible academic legitimacy for Meridian-funded research.', alert: null },
                        { name: 'Equipment R&D Workshop', status: 'ACTIVE', head: 'Systems Architect', dept: 'Meridian Systems', personnel: '18', hazard: 'NONE', desc: 'Develops and field-tests new expedition equipment before it is rolled out to Streymoy, Iceland, and Newfoundland.', alert: null }
                    ]
                },
                {
                    id: 'sc_l2', label: 'Support Level', depth: '-10m',
                    rooms: [
                        { name: 'European Logistics Depot', status: 'ACTIVE', head: 'Expedition Support Crew', dept: 'Expeditionary Division', personnel: '25', hazard: 'NONE', desc: 'Coordinates the transit of Meridian personnel and equipment throughout Europe, keeping the organization\'s footprint small and its movements unremarkable.', alert: null },
                        { name: 'Visiting Researcher Quarters', status: 'ACTIVE', head: 'General Assignment', dept: 'General Assignment', personnel: '12', hazard: 'NONE', desc: 'Short-term housing for researchers rotating between Meridian holdings, deliberately kept modest to avoid drawing attention from the surrounding community.', alert: null }
                    ]
                },
                {
                    id: 'sc_l3', label: 'Historical Liaison Annex', depth: '-20m',
                    rooms: [
                        { name: 'Archive Cross-Reference Office', status: 'RESTRICTED', head: 'Deputy Archivist (Liaison)', dept: 'Historical Archives', personnel: '6', hazard: 'NONE', desc: 'Handles quiet cross-referencing work against university and museum archives across the United Kingdom and Ireland, several steps removed from Streymoy\'s Historical Archives Reading Room. <span class="redact" onclick="revealRedact(this)">One standing joint file with a university archive is maintained without the university\'s knowledge</span>.', alert: null },
                        { name: 'Visiting Delegate Suite', status: 'RESTRICTED', head: 'Executive Director (Liaison)', dept: 'External & Diplomatic Command', personnel: '2', hazard: 'NONE', desc: 'A modest meeting suite used on the rare occasions European contacts, including Continuance-adjacent academics, are received in person rather than through a front organization. <span class="redact" onclick="revealRedact(this)">Every session held here is monitored by a Security & Information officer posing as catering staff</span>.', alert: null }
                    ]
                }
            ]
        }
    };

    const DB_MESSAGES = [
        {
            id: 'M-101', from: 'Directorate Council', to: 'ALL SENIOR STAFF', subject: 'DIRECTIVE: CONTINUANCE RELATIONS', date: '2032-10-04',
            classification: 'RESTRICTED', precedence: 'PRIORITY',
            body: 'Personnel are reminded that interactions with agents of the Continuance must be reported to the Security and Information Division immediately. While cooperative efforts regarding historical anomalous events are occasionally sanctioned, the Continuance remains ideologically opposed to our research goals.\n\nAny unsolicited contact, however minor, is to be logged within twenty-four hours regardless of outcome. <span class="redact" onclick="revealRedact(this)">This includes contact believed to be coincidental; Security & Information has assessed at least two prior "chance encounters" as deliberate probing</span>. Protect your data.',
            attachments: [
                { id: 'att-101a', name: 'CONTINUANCE_CONTACT_PROTOCOL.DEC', classification: 'RESTRICTED', content: 'PROCEDURE FOR REPORTING CONTINUANCE CONTACT\n\n1. Do not confirm or deny any Meridian affiliation beyond what the liaison already appears to know.\n2. Note the exact time, location, and verbatim phrasing of any question asked.\n3. File a contact report with Security & Information within 24 hours via the Compartmentalization Office.\n4. Do not attempt to reciprocate an information exchange without prior Council authorization.\n\nHistorically, Continuance agents have shown particular interest in <span class="redact" onclick="revealRedact(this)">material referencing the 1806 incident and anything cross-referencing pre-1908 Inquiry recordkeeping</span>. Flag any question touching these topics as elevated priority regardless of how casual it seemed.' }
            ]
        },
        {
            id: 'M-102', from: 'Dept. of Rift Dynamics', to: 'Expeditionary Division', subject: 'ALERT: Duration Increases', date: '2032-10-12',
            classification: 'LEVEL 4', precedence: 'FLASH',
            body: 'Recent telemetry from the Iceland station indicates a 14% increase in the average duration of North Atlantic Rift manifestations. Prepare staging teams for extended deployments. We believe this represents the fundamental shift we have been hypothesizing.\n\nFull thirty-day trending data attached. Note the inflection point roughly two-thirds through the window - Meridian Systems confirms it is not an instrumentation artifact.',
            attachments: [
                { id: 'att-102a', name: 'NORTH_ATLANTIC_DURATION_TREND.DAT', classification: 'LEVEL 4', content: 'ROLLING 30-DAY DURATION TREND - NORTH ATLANTIC SECTOR\nSOURCE: Meridian North Atlantic Station, Iceland\n\nBaseline average duration (start of window): 41.2 hours\nCurrent average duration: 47.0 hours\nDelta: +14.1%\n\nInflection point logged Day 19; no corresponding instrumentation fault found on cross-check. Modeling continues under the standing hypothesis that this reflects a structural change in the relationship between Earth and the source realities, not a local or seasonal effect.\n\nRecommend Expeditionary Division plan staging rotations assuming the elevated duration is now the new baseline, not a temporary spike.' }
            ]
        },
        {
            id: 'M-103', from: 'Meridian Systems', to: 'ALL USERS', subject: 'Photonic Processing Update', date: '2032-10-14',
            classification: 'UNCLASSIFIED', precedence: 'ROUTINE',
            body: 'The mainframe is undergoing defragmentation of the crystalline data systems to better process the latest anomalous data sets. You may experience increased screen flicker and UI latency. Do not attempt to reboot your CRT terminals; the analog hardware is acting as a necessary buffer.\n\nEstimated completion: 72 hours. Report any terminal that stops responding entirely, rather than merely flickering, to your local Systems Technician.'
        },
        {
            id: 'M-104', from: 'Security & Information Division', to: 'ALL STREYMOY PERSONNEL', subject: 'REMINDER: Compartmentalization Discipline', date: '2032-10-16',
            classification: 'RESTRICTED', precedence: 'PRIORITY',
            body: 'Two separate incidents this quarter involved staff discussing project details outside their designated work areas, including within Mess Hall earshot of visiting Surface Cover Station personnel. You do not need to know what the person next to you is working on, and they do not need to know what you are working on. This is not paranoia. This is why we are still here and the Commission is not.\n\nA third, unrelated incident is under active internal review; details will not be shared outside Security & Information.'
        },
        {
            id: 'M-105', from: 'Executive Director', to: 'Directorate Council', subject: 'Continuance Contact - Reykjavik Signal Follow-Up', date: '2032-10-18',
            classification: 'OMEGA', precedence: 'PRIORITY',
            body: 'A Continuance liaison requested a closed-channel exchange regarding the Reykjavik Signal anomaly. Request approved for a single supervised session in the Continuance Liaison Suite, Security in attendance, no digital transcription per standing protocol. Full verbal debrief to follow at the next session.\n\nThey asked more questions than they answered, as usual. <span class="redact" onclick="revealRedact(this)">The liaison specifically asked whether Streymoy had cross-referenced the Signal against anything predating 1908, which we had not disclosed to them</span>. Recommend the Council treat that as confirmation the Continuance is monitoring our archive requests in some capacity we have not yet identified.',
            attachments: [
                { id: 'att-105a', name: 'SESSION_SUMMARY_REYKJAVIK.OMG', classification: 'OMEGA', content: 'CLASSIFICATION: OMEGA\nSESSION: Continuance Liaison Suite, Scotland Field Station\nATTENDING: Executive Director, one (1) Security & Information officer, one (1) unidentified Continuance liaison\nTRANSCRIPTION: None - verbal debrief only, per standing protocol\n\nSummary reconstructed from officer notes immediately following session:\n\nLiaison opened by referencing the Reykjavik Signal by name without prompting, indicating prior awareness. <span class="redact" onclick="revealRedact(this)">Liaison then asked a direct question referencing pre-1908 Inquiry recordkeeping, a topic never raised with the Continuance by this office</span>. Executive Director declined to confirm or deny. Session ended after approximately eleven minutes at the liaison\'s initiative.\n\nNo information was knowingly disclosed by Meridian personnel. Recommend elevated monitoring of all archive request logs for the next two quarters.' }
            ]
        },
        {
            id: 'M-106', from: 'Archivist Prime', to: 'Directorate Council', subject: 'Cross-Reference Match: Pre-1908 Fragment', date: '2032-10-21',
            classification: 'LEVEL 4 (RESTRICTED)', precedence: 'ROUTINE',
            body: 'A partial ledger recovered during last month\'s Newfoundland materials transfer contains a notation style consistent with early Inquiry-era recordkeeping, predating the Commission\'s first confirmed appearance in 1908. Cross-referencing against the Council Deep Archive now.\n\nIf confirmed, this would be among the oldest verified documents in our holdings. Request temporary elevated access to compare against restricted materials. Preliminary transcription attached; original document remains in Newfoundland pending transfer authorization.',
            attachments: [
                { id: 'att-106a', name: 'LEDGER_FRAGMENT_PRELIM_TRANSCRIPT.DEC', classification: 'LEVEL 4 (RESTRICTED)', content: 'PRELIMINARY TRANSCRIPTION - PARTIAL LEDGER, ORIGIN UNCONFIRMED\nCUSTODIAN: Archivist Prime\nCONDITION: Fragmentary, water damage along outer edge\n\nRecordkeeping conventions match documented pre-1908 Inquiry practice: dated entries, location shorthand, no organizational letterhead of any kind.\n\nMost legible passage, translated: "...the manifestation does not close, only quiets. We have watched it quiet before."\n\nLocation referenced in the surrounding entries remains <span class="redact" onclick="revealRedact(this)">a coastal settlement, name illegible, tentatively cross-referenced against three candidate sites in northern Europe</span>. Full transcription pending physical transfer of the original to Streymoy for spectral imaging.' }
            ]
        },
        {
            id: 'M-107', from: 'Dept. of Materials Science', to: 'Director, Security & Information Division', subject: 'Standing Watch Brief Update - Exclusion Zones', date: '2032-10-23',
            classification: 'LEVEL 5', precedence: 'PRIORITY',
            body: 'No new activity to report at Kashmir this cycle. Flagging renewed seismic irregularity at the Făgăraș Closure consistent with patterns we logged before two prior weaponization-adjacent incidents elsewhere.\n\nRecommend quiet tasking of a Field Researcher team under commercial cover, not an official expedition. Do not want this on anyone\'s radar yet, including our own front organizations. <span class="redact" onclick="revealRedact(this)">Preliminary readings suggest a signature consistent with the VARUNA containment pattern, though we stress this is unconfirmed pending on-site sampling</span>.',
            attachments: [
                { id: 'att-107a', name: 'FAGARAS_SEISMIC_SUMMARY.INT', classification: 'LEVEL 5', content: 'CLASSIFICATION: LEVEL 5\nFROM: Department of Materials Science\nDISTRIBUTION: Security & Information Division only\n\nSeismic irregularity at Făgăraș Closure logged over the past nine days shows a pattern this department has previously associated with two prior weaponization-adjacent incidents. <span class="redact" onclick="revealRedact(this)">Frequency signature shows partial overlap with the VARUNA event data recovered after the 2022 Kashmir Rift Crisis, though sample size is too small for a confident match</span>.\n\nRecommend covert sampling only. An overt expedition risks alerting whichever government or corporate party is monitoring the Closure\'s public "natural disaster" classification.' }
            ]
        },
        {
            id: 'M-108', from: 'Expeditionary Division', to: 'Dept. of Rift Dynamics', subject: 'Iceland Deployment - Status Nominal', date: '2032-10-25',
            classification: 'LEVEL 4', precedence: 'ROUTINE',
            body: 'Extended Arctic staging team confirms the North Atlantic long-duration manifestation remains stable at current parameters. No adverse biological or materials readings after eleven days of continuous monitoring.\n\nRequesting authorization to extend the deployment window another thirty days given the duration trend you flagged in M-102. Crew morale holding, mostly thanks to the Newfoundland care packages.'
        },
        {
            id: 'M-109', from: 'Meridian Systems', to: 'ALL USERS', subject: 'Scheduled Analog Buffer Maintenance', date: '2032-10-27',
            classification: 'UNCLASSIFIED', precedence: 'ROUTINE',
            body: 'CRT buffer banks across all four holdings will undergo staggered recalibration over the next week. Streymoy first, Iceland and Scotland to follow, Newfoundland last. Expect intermittent terminal flicker during your facility\'s maintenance window.\n\nDo not attempt unauthorized buffer swaps; mismatched analog housings have caused two data corruption incidents this year already.'
        },
        {
            id: 'M-110', from: 'Director, Security & Information Division', to: 'Directorate Council', subject: 'INCIDENT REPORT: Attempted Unauthorized Archive Access', date: '2032-10-29',
            classification: 'OMEGA', precedence: 'FLASH',
            body: 'At 0314 local time, an attempt was made to query the Council Deep Archive from a terminal registered to Historical Archives Reading Room using credentials belonging to a Senior Archivist currently on approved leave off-site.\n\nThe query targeted material predating 1908. Terminal was remotely isolated within ninety seconds; no material was retrieved. <span class="redact" onclick="revealRedact(this)">Credential owner has been contacted and confirms their access token was not in their possession at the time of the query; investigation is treating this as a compromised token, not misconduct by the credential holder</span>. Full access log attached.',
            attachments: [
                { id: 'att-110a', name: 'ACCESS_LOG_EXCERPT_0314.SEC', classification: 'OMEGA', content: 'CLASSIFICATION: OMEGA\nSOURCE: Streymoy Compartmentalization Office, automated capture\n\n03:14:02 - Query initiated, Historical Archives Reading Room terminal 07\n03:14:02 - Credential: Senior Archivist (on approved leave, off-site per travel log)\n03:14:03 - Query target: Council Deep Archive, pre-1908 index\n03:14:31 - Anomalous access pattern flagged, automated isolation triggered\n03:15:29 - Terminal 07 isolated from network; no data transferred\n\n<span class="redact" onclick="revealRedact(this)">Physical inspection of terminal 07 shows no forced entry. Building access logs show no personnel entering the Reading Room between 02:00 and 04:00. Origin of the query remains unresolved</span>.' }
            ]
        },
        {
            id: 'M-111', from: 'Deputy Director, External Operations Division', to: 'Director, External Operations Division', subject: 'Front Organization Renewal - Newfoundland Cover Entities', date: '2032-10-30',
            classification: 'LEVEL 4', precedence: 'ROUTINE',
            body: 'Annual paperwork renewal for the three shell entities anchoring our Newfoundland cover identity is complete. No issues flagged by outside counsel. Two Handlers due for standard performance review before the cycle closes; scheduling now.\n\nNothing else to escalate this cycle.'
        },
        {
            id: 'M-112', from: 'Expedition Commander', to: 'Directorate Council', subject: 'Request: Extended Authorization, Făgăraș Closure Reconnaissance', date: '2032-11-01',
            classification: 'LEVEL 5', precedence: 'PRIORITY',
            body: 'Following the Materials Science watch brief (see M-107), requesting Council authorization for a covert reconnaissance tasking at the Făgăraș Closure. Proposing a two-person Field Researcher team under existing commercial cover, sampling only, no extended dwell time inside the perimeter.\n\nFull proposal attached. Awaiting Council sign-off before staging begins; window closes in nine days if we want to sample before the next public "maintenance" access period the site administrators have scheduled.',
            attachments: [
                { id: 'att-112a', name: 'FAGARAS_RECON_PROPOSAL.OPS', classification: 'LEVEL 5', content: 'MISSION PROPOSAL: FĂGĂRAȘ CLOSURE COVERT RECONNAISSANCE\nPREPARED BY: Office of the Expedition Commander\n\nOBJECTIVE: Confirm or rule out a VARUNA-pattern signature match at the seismic anomaly flagged by Materials Science.\nTEAM: Two (2) Field Researchers, commercial geological-survey cover, no Meridian insignia carried.\nDURATION: Single-day access window, no overnight dwell inside the restricted perimeter.\nCONTINGENCY: <span class="redact" onclick="revealRedact(this)">If readings match the VARUNA signature above 70% confidence, team is to withdraw immediately without collecting physical samples and report by secure channel only</span>.\n\nRisk assessment: LOW under proposed cover, ELEVATED if local site administrators alter the scheduled maintenance access window without notice.' }
            ]
        },
        {
            id: 'M-113', from: 'Historical Archives Division', to: 'Archivist Prime', subject: 'Newfoundland Ledger - Translation Progress', date: '2032-11-02',
            classification: 'LEVEL 4 (RESTRICTED)', precedence: 'ROUTINE',
            body: 'Follow-up to your M-106 circulation. Spectral imaging of the original fragment is complete now that it has reached Streymoy. Translation team has extracted two additional legible passages beyond the one already quoted.\n\nBoth passages are consistent with the working hypothesis that the notation predates 1908. Full excerpt attached for your review before wider circulation, per your original request.',
            attachments: [
                { id: 'att-113a', name: 'LEDGER_TRANSLATION_EXCERPT_02.DEC', classification: 'LEVEL 4 (RESTRICTED)', content: 'TRANSLATION EXCERPT - ADDITIONAL PASSAGES, SPECTRAL IMAGING PASS\nCUSTODIAN: Archivist Prime\n\nPassage 2 (translated): "...they do not ask us to close it. They ask only that we watch, and note when it changes its breathing."\n\nPassage 3 (translated, partial): <span class="redact" onclick="revealRedact(this)">"...the ones before us called it by a name we have chosen not to record here, for reasons the reader will understand if they have read this far."</span>\n\nTranslation team notes the phrasing implies an existing observational practice already in place before this ledger was written - consistent with the theory that whatever opened in 1806 was already being watched by someone prior to that date.' }
            ]
        },
        {
            id: 'M-114', from: 'Directorate Council', to: 'ALL PERSONNEL', subject: 'ANNUAL COMPARTMENTALIZATION REVIEW - SCHEDULE', date: '2032-11-03',
            classification: 'UNCLASSIFIED', precedence: 'ROUTINE',
            body: 'The annual compartmentalization review begins next month at all four holdings. All personnel, regardless of clearance level, are required to complete the standard refresher and confirm their current cover-identity status with their local Compartmentalization Office.\n\nScheduling will be posted by facility; no exceptions for personnel currently on field deployment, who will complete the review remotely on return.'
        }
    ];

    const DB_FILESYSTEM = {
        'root': { name: 'MERIDIAN_ARCHIVE', type: 'dir', children: [
            'dir_profile', 'dir_hq', 'dir_holdings', 'dir_leadership', 'dir_purpose',
            'dir_assets', 'dir_registry', 'dir_history', 'dir_structure',
            'dir_public_status', 'dir_technology', 'dir_philosophy', 'dir_continuance', 'restricted'
        ] },

        'dir_profile': { name: '01_FACTION_PROFILE', type: 'dir', children: ['profile_file'] },
        'profile_file': { name: 'PROFILE.TXT', type: 'file', content:
            'FACTION NAME: The Meridian Directorate for Anomalous Research\nABBREVIATION/ALIAS: The Meridian Directorate // The Meridian\nFACTION TYPE: Independent Organization\nRIFTBORN VARIANT: No\nFOUNDED: 2009\n\nHEADQUARTERS: Streymoy, Faroe Islands. See 02_HEADQUARTERS for full record.\n\nPERSONNEL: Approximately 30,000, including researchers, engineers, medical specialists, archivists, expedition staff, security personnel, intelligence personnel, administrative employees, and personnel operating under Meridian front organizations. Only a portion of these personnel are aware they work for the Meridian at all; many believe they work for ordinary scientific institutions, private research companies, medical organizations, or government contractors.\n\nSee 04_LEADERSHIP, 05_PURPOSE, and 09_ORGANIZATIONAL_STRUCTURE for governance, mission, and division records.' },

        'dir_hq': { name: '02_HEADQUARTERS', type: 'dir', children: ['hq_file'] },
        'hq_file': { name: 'STREYMOY_HQ.TXT', type: 'file', content:
            'STREYMOY HEADQUARTERS\nLocation: Streymoy, Faroe Islands\n\nThe organization\'s principal administrative and research facility. Located beneath a seemingly ordinary North Atlantic atmospheric research station, it contains the Directorate\'s central administration, primary laboratories, historical archives, advanced computing systems, and senior research staff.\n\nThe Directorate\'s geographic isolation provides security while still allowing relatively easy access to Europe and the North Atlantic, a balance the founders considered essential when selecting the site in 2009. From Streymoy, the Meridian gradually developed the network of legitimate scientific institutions, shell corporations, academic partnerships, and research foundations that let it operate without revealing its true existence.\n\nFor a full structural breakdown by level and room, consult the FACILITY_SCHEMATICS terminal.' },

        'dir_holdings': { name: '03_HOLDINGS', type: 'dir', children: ['holdings_overview', 'holding_iceland', 'holding_newfoundland', 'holding_scotland'] },
        'holdings_overview': { name: '00_OVERVIEW.TXT', type: 'file', content:
            'ESTABLISHED HOLDINGS (beyond Streymoy HQ)\n\n1. Meridian North Atlantic Station - Iceland\n2. Meridian Newfoundland Facility - Newfoundland and Labrador\n3. Meridian Field Station - Scotland, United Kingdom\n\nEach holding operates under a legitimate cover identity and reports back to Streymoy through the Directorate\'s encrypted crystalline relay network. To the outside world these are separate organizations; to the Meridian, they are simply different pieces of the same network. See individual holding files for detail, or the FACILITY_SCHEMATICS terminal for room-level schematics.' },
        'holding_iceland': { name: '01_ICELAND_STATION.TXT', type: 'file', content:
            'MERIDIAN NORTH ATLANTIC STATION\nLocation: Iceland\n\nA remote Rift monitoring and atmospheric research station. It tracks anomalous activity across the North Atlantic and serves as a staging point for expeditions traveling between Europe, Iceland, Greenland, and the Arctic. The facility also conducts research into long-duration Rifts and unusual atmospheric phenomena - presently the Directorate\'s single highest research priority.' },
        'holding_newfoundland': { name: '02_NEWFOUNDLAND_FACILITY.TXT', type: 'file', content:
            'MERIDIAN NEWFOUNDLAND FACILITY\nLocation: Newfoundland and Labrador, Canada\n\nThe Directorate\'s principal North American research and expedition facility. Located in a remote area of Newfoundland, the facility provides the Meridian with access to the North American anomalous research network while maintaining significant distance from major population centers. It specializes in Rift detection, anomalous materials, expedition preparation, and monitoring activity throughout the North Atlantic. Its position also allows the Directorate to coordinate operations across North America.' },
        'holding_scotland': { name: '03_SCOTLAND_FIELD_STATION.TXT', type: 'file', content:
            'MERIDIAN FIELD STATION\nLocation: Scotland, United Kingdom\n\nA smaller European research and expedition facility used for anomalous research, equipment development, academic cooperation, and liaison with universities and independent researchers. It also provides logistical support for Meridian personnel traveling throughout Europe.' },

        'dir_leadership': { name: '04_LEADERSHIP', type: 'dir', children: ['leadership_file'] },
        'leadership_file': { name: 'LEADERSHIP.TXT', type: 'file', content:
            'The Meridian is governed by a small Directorate Council composed of senior researchers, administrators, and surviving former Commission personnel. The Council oversees major policy, research priorities, security, and any relations with outside organizations.\n\nA current Executive Director acts as the public and diplomatic representative of the organization when necessary, although very few people outside the Meridian know their true identity.\n\nThe Directorate Council operates under a strict principle:\n\n"The Meridian must survive, even if its members do not."\n\nFor full rank structure below Council level, consult the CHAIN_OF_COMMAND terminal.' },

        'dir_purpose': { name: '05_PURPOSE', type: 'dir', children: ['purpose_file'] },
        'purpose_file': { name: 'PURPOSE.TXT', type: 'file', content:
            'The Meridian Directorate exists to independently study Rifts and anomalous phenomena. Its primary objective is to understand the Rifts, their relationship with other realities, and their effects on Earth and the people on Earth.\n\nThe Directorate believes humanity has become too focused on containing anomalies without properly understanding them. It therefore prioritizes observation, research, controlled experimentation, and long-term study of the anomalies.\n\nIts greatest current concern is the increasing size and duration of Rifts observed throughout the late 2020s and early 2030s. The Meridian believes this may represent a fundamental and sudden change in the relationship between Earth and the realities within the Rifts.\n\nUNPUBLISHED SECONDARY PURPOSE:\nThe Meridian also exists to prevent anomalous knowledge from falling into the wrong hands. This objective is not publicly acknowledged, even within most of the organization itself.' },

        'dir_assets': { name: '06_SIGNIFICANT_ASSETS', type: 'dir', children: ['assets_file'] },
        'assets_file': { name: 'SIGNIFICANT_ASSETS.TXT', type: 'file', content:
            '1. ADVANCED RESEARCH DIVISION\nExceptional scientific personnel, laboratories, analytical systems, and research infrastructure dedicated to anomalous phenomena.\n\n2. ADVANCED ENGINEERING DIVISION\nExtensive experience developing specialized equipment, adapting to Rift-derived materials, constructing research systems, and combining anomalous discoveries with technology.\n\n3. EXPEDITIONARY LOGISTICS\nThe personnel, transportation, equipment, and logistical infrastructure necessary to conduct long-duration research expeditions through dangerous or remote Rift environments.' },

        'dir_registry': { name: '07_ANOMALY_REGISTRY', type: 'dir', children: ['registry_file'] },
        'registry_file': { name: 'REGISTRY_SUMMARY.TXT', type: 'file', content:
            'ANOMALY REGISTRY - HOLDING LIMITS (STARTING AUTHORIZATION)\n\nClass 1: Unlimited\nClass 2: 0 / 5\nClass 3: 0 / 3\nClass 4: 0 / 2\nClass 5: 0 / 1\nClass 6: 0 / 1\n\nThe Meridian does not necessarily believe every anomaly should be destroyed - see 12_CONTAINMENT_PHILOSOPHY. For the live, itemized registry of anomalies currently catalogued under each classification, consult the ANOMALY_REGISTRY terminal directly.' },

        'dir_history': { name: '08_HISTORY', type: 'dir', children: ['history_origins', 'history_founding', 'history_expansion', 'history_present'] },
        'history_origins': { name: '01_ORIGINS.TXT', type: 'file', content:
            'The origins of the Meridian Directorate trace to the final decades of the Commission. Among the Commission\'s many divisions was a group of researchers dedicated to studying the deeper patterns behind Rift manifestations, rather than simply cataloguing or containing individual anomalies.\n\nThese researchers began to suspect that Rifts were not isolated events. Similarities between seemingly unrelated manifestations, anomalous materials, biological phenomena, and historical records suggested something larger connecting them. The research remained classified within the Commission.\n\nThen came the Brooklyn Exposure of June 22, 2007: a Rift in Prospect Park released roughly 173 stone-bodied entities that killed more than 10,000 people before military force finally ended the incident. Two centuries of classified agreements had left every institution capable of responding without the authority to act, and those with authority lacked the information. The Masquerade could not survive it.' },
        'history_founding': { name: '02_FOUNDING.TXT', type: 'file', content:
            'The Thirty-Six Days of leaks and seizures that followed Brooklyn ended with Disclosure on July 28, 2007. The Culling that followed in 2008-2009 devastated the Commission\'s institutional structure: facilities were seized, personnel disappeared, and enormous quantities of anomalous knowledge were scattered or destroyed. Most of the scientists who had spent their careers studying Rifts were suddenly without an institution.\n\nA small group of these researchers decided their work could not disappear with the Commission. They secretly recovered portions of Commission archives, research records, scientific equipment, and historical datasets before establishing their own independent organization in 2009: the Meridian Directorate.\n\nThe founders could not preserve everything - much Commission knowledge was seized by governments, absorbed into corporations, or lost entirely. But the Meridian retained enough to continue several of the Commission\'s unfinished research programs, deliberately remaining independent and hidden from both the rebuilding governments and the corporations beginning to recognize the Rifts\' commercial potential.' },
        'history_expansion': { name: '03_EXPANSION.TXT', type: 'file', content:
            'The Directorate established its headquarters in the Faroe Islands beneath a disguised research station, then gradually developed a network of legitimate scientific institutions, shell corporations, academic partnerships, and research foundations. Facilities followed in Iceland, Scotland, and eventually Newfoundland - to the outside world, separate organizations; to the Meridian, pieces of the same network.\n\nThis network became particularly valuable during the Rift Age (2017-2024). By the late 2010s the Meridian had become increasingly involved in long-duration Rift research, anomalous materials, Riftborn biology, and the development of specialized technologies. Its researchers began combining Rift materials with advanced computing systems, creating the Directorate\'s distinctive retro-housed computational technology.' },
        'history_present': { name: '04_PRESENT_DAY.TXT', type: 'file', content:
            'In the current year, the Meridian has become a large but almost entirely invisible organization operating beneath the surface of the post-Disclosure world. Governments know unexplained research facilities exist, and scientists occasionally encounter Meridian researchers, but almost nobody realizes these incidents are connected.\n\nThe Directorate\'s foremost concern is the trend first flagged across 2029-2032: Rifts are growing larger and lasting longer, for reasons nobody has been able to determine. See 05_PURPOSE and the Department of Rift Dynamics entry in 09_ORGANIZATIONAL_STRUCTURE.' },

        'dir_structure': { name: '09_ORGANIZATIONAL_STRUCTURE', type: 'dir', children: ['structure_file'] },
        'structure_file': { name: 'STRUCTURE.TXT', type: 'file', content:
            'The Meridian is organized into the following major divisions:\n\nDIRECTORATE COUNCIL\nGoverning body. Oversees major policy, funding, research priorities, and external relations.\n\nDEPARTMENT OF RIFT DYNAMICS\nStudies Rift formation, behavior, duration, and geographic distribution.\n\nDEPARTMENT OF ANOMALOUS BIOLOGY\nStudies Riftborn biology, anomalous organisms, ecosystems, diseases, and biological materials.\n\nDEPARTMENT OF MATERIALS SCIENCE\nStudies Rift materials and their potential applications in technology and industry.\n\nMERIDIAN SYSTEMS\nResponsible for computing infrastructure, communications, data analysis, and experimental computer systems.\n\nHISTORICAL ARCHIVES DIVISION\nMaintains recovered Commission records and investigates historical Rift events, including incidents predating Disclosure.\n\nEXPEDITIONARY DIVISION\nConducts field research, exploration, sample recovery, and investigation of newly discovered Rifts and Exclusion Zones.\n\nSECURITY AND INFORMATION DIVISION\nProtects Meridian personnel, facilities, research, and identities; manages compartmentalization and cover identities.\n\nEXTERNAL OPERATIONS DIVISION\nMaintains the Meridian\'s network of front organizations, shell companies, academic institutions, contractors, and contacts.\n\nFor personnel ranks within each division, consult the CHAIN_OF_COMMAND terminal.' },

        'dir_public_status': { name: '10_PUBLIC_STATUS', type: 'dir', children: ['public_status_file'] },
        'public_status_file': { name: 'PUBLIC_STATUS.TXT', type: 'file', content:
            'The Meridian Directorate is not publicly known to exist as an organization. The wider scientific community occasionally encounters Meridian-funded research facilities or personnel, but these activities are attributed to legitimate scientific institutions and private organizations.\n\nThe Meridian deliberately maintains several layers of separation between itself and the outside world. All the different shell organizations can ultimately trace their funding, personnel, or research back to the Meridian, but very few people know the full chain.\n\nSome governments are aware that an unidentified organization appears to be operating several anomalous research facilities worldwide. Some intelligence agencies refer to it as "Meridian," though there is no universally accepted confirmation that this is its actual name.\n\nThe Continuance almost certainly knows more. The Meridian considers this acceptable. See 13_THE_CONTINUANCE.' },

        'dir_technology': { name: '11_TECHNOLOGY', type: 'dir', children: ['technology_file'] },
        'technology_file': { name: 'TECHNOLOGY.TXT', type: 'file', content:
            'The Meridian is particularly recognizable for its unconventional computing technology. Its laboratories combine advanced 2032 computing with experimental materials, some sourced from the Rifts: photonic processors, crystalline data systems, and highly specialized computing machines.\n\nMeridian technology has a distinctive retro-futuristic appearance. Computers are often retrofitted, analog-heavy, and resemble 1980s CRT terminals rather than conventional modern technology, though they are slightly more powerful than their appearance suggests. The analog housing is not an aesthetic affectation - it acts as a hardware buffer, shielding the crystalline subsystems from the data corruption that plagues conventional systems processing anomalous telemetry.\n\nThe systems are specifically designed to process anomalous data, allowing Meridian researchers to identify complex patterns in Rift activity that conventional systems may overlook.' },

        'dir_philosophy': { name: '12_CONTAINMENT_PHILOSOPHY', type: 'dir', children: ['philosophy_file'] },
        'philosophy_file': { name: 'PHILOSOPHY.TXT', type: 'file', content:
            'The Meridian does not consider itself a containment organization, although it maintains containment facilities throughout its network.\n\nThe Meridian philosophy is simple: if an anomaly is dangerous and cannot be safely studied in the open, it must be isolated. Some anomalies are transferred to secure Meridian facilities. Others are monitored in their natural environments. Some are deliberately hidden from governments and corporations.\n\nThe Meridian does not necessarily believe every anomaly should be destroyed - in many cases, destroying an anomaly before understanding it could eliminate valuable information.' },

        'dir_continuance': { name: '13_THE_CONTINUANCE', type: 'dir', children: ['continuance_file'] },
        'continuance_file': { name: 'CONTINUANCE_RELATIONS.TXT', type: 'file', content:
            'The Meridian maintains an uneasy relationship with the Continuance. Both organizations possess fragments of anomalous knowledge accumulated before Disclosure, but their philosophies differ: the Meridian seeks to understand and expand upon the knowledge it holds, while the Continuance appears primarily concerned with preserving and controlling it.\n\nThe two organizations occasionally cooperate when circumstances require it, particularly when investigating historically significant anomalies. However, both remain suspicious of the other\'s motives and quietly compete for access to old Commission archives and anomalous discoveries.\n\nThe Meridian suspects the Continuance knows more about the origins of Rifts than it admits. Further assessment is restricted; see 99_RESTRICTED if cleared.' },

        'restricted': { name: '99_RESTRICTED', type: 'restricted_dir', children: ['commission_legacy', 'continuance_intel', 'council_directive', 'kashmir_assessment', 'brooklyn_afteraction', 'origin_fragment'] },
        'commission_legacy': { name: 'THE_CULLING_LOGS.DEC', type: 'file', content:
            'CLASSIFICATION: OMEGA\nSOURCE: Recovered analog fragments, origin unconfirmed\nCUSTODIAN: Archivist Prime\n\nRecords recovered from the ashes of the Commission following the Culling.\n\n[DATA CORRUPTED] ...governments demanded information. The removal of senior Commission personnel was systematic - first for knowing, then for lying about knowing. We took what we could before the archives disappeared entirely, including <span class="redact" onclick="revealRedact(this)">a partial personnel roster from the Streymoy founding cell</span> and <span class="redact" onclick="revealRedact(this)">correspondence naming three still-active government contacts</span>. We must never allow the Meridian to suffer the same fate. Secrecy is survival.\n\n[FRAGMENT ENDS]' },
        'continuance_intel': { name: 'CONTINUANCE_ASSESSMENT.INT', type: 'file', content:
            'CLASSIFICATION: OMEGA\nPREPARED BY: Office of the Executive Director\nDISTRIBUTION: Directorate Council only\n\nThe Continuance presents itself as a preservationist body, but we assess they know more about the origin of Rifts than they admit, and quite possibly more than the original Commission ever recovered. They possess fragments of pre-Disclosure knowledge we lack, reportedly including <span class="redact" onclick="revealRedact(this)">material predating even the 1806 incident</span>. We compete quietly for what remains of the old archives.\n\nDo not trust their agents, even during joint historical investigations. Their goal is control; ours is understanding. Current assessed leadership structure: <span class="redact" onclick="revealRedact(this)">unknown - no confirmed Continuance defector has survived contact long enough to debrief</span>.' },
        'council_directive': { name: 'DIRECTIVE_0.TXT', type: 'file', content:
            'CLASSIFICATION: OMEGA\nFROM: Directorate Council\nSTATUS: STANDING, IN FORCE\n\n"The Meridian must survive, even if its members do not."\n\nIn the event of a catastrophic exposure event, all front organizations will sever ties immediately. HQ will initiate a total data purge and physical lockdown at every holding via the Emergency Purge Control station. Personnel are expendable; the knowledge is not.\n\nSecondary fallback protocol, to be enacted only if Streymoy itself is compromised: <span class="redact" onclick="revealRedact(this)">activate the dormant relay cell and relocate the Deep Archive to the undisclosed secondary site referenced in Council correspondence</span>.' },
        'kashmir_assessment': { name: 'KASHMIR_WEAPONIZATION_WATCH.INT', type: 'file', content:
            'CLASSIFICATION: LEVEL 5\nFROM: Department of Materials Science\nDISTRIBUTION: Council, Security & Information Division\n\nThe 2022 Kashmir Rift Crisis confirmed what this department suspected since the Rift Age began: state militaries are actively weaponizing anomalous materials and organisms. VARUNA\'s failure and the resulting Exclusion Zone demonstrate the core danger - an anomalous weapon can outlast the conflict that deployed it, and the battle can end without the weapon ending.\n\nWe maintain a standing watch brief on all publicly acknowledged Exclusion Zones for signs of similar military origin, including undisclosed monitoring of <span class="redact" onclick="revealRedact(this)">the Făgăraș Closure and the Yakutsk Exclusion, both showing readings inconsistent with their public "natural disaster" classification</span>. This assessment is not shared with the Directorate Council\'s public-facing summaries.' },
        'brooklyn_afteraction': { name: 'BROOKLYN_AFTERACTION_REVIEW.DEC', type: 'file', content:
            'CLASSIFICATION: OMEGA\nSOURCE: Reconstructed from partial Commission field logs\nCUSTODIAN: Historical Archives Division\n\nInternal Commission review of the June 22, 2007 Prospect Park manifestation, recovered in fragments and reassembled long after Disclosure. Six hours elapsed between first containment request and authorized lethal-force deployment. Reconstructed chain of delay:\n\n1. Local authorities lacked clearance to acknowledge the manifestation as anomalous.\n2. The regional Commission liaison was <span class="redact" onclick="revealRedact(this)">unreachable for forty-one minutes due to a jurisdictional dispute with a separate, unacknowledged program</span>.\n3. Military authorization required sign-off from <span class="redact" onclick="revealRedact(this)">an official who did not believe the reports until viewing camera footage himself</span>.\n\nThe Directorate\'s founders cite this document as the single clearest argument against ever again allowing containment authority to depend on more than one chain of command. We do not intend to repeat it.' },
        'origin_fragment': { name: 'INQUIRY_ORIGIN_FRAGMENT.DEC', type: 'file', content:
            'CLASSIFICATION: OMEGA\nSOURCE: Newfoundland materials transfer, ledger fragment, authenticity under review\nCUSTODIAN: Archivist Prime\n\nPartial ledger, recordkeeping style consistent with pre-1908 Inquiry practice. Referenced location and circumstances of the 1806 incident remain <span class="redact" onclick="revealRedact(this)">a coastal settlement, name illegible, tentatively cross-referenced against three candidate sites in northern Europe</span>.\n\nMost significant line, translated: "...the manifestation does not close, only quiets. We have watched it quiet before." The implication - that whatever opened in 1806 was already being observed by someone prior to that date - has not been resolved. <span class="redact" onclick="revealRedact(this)">Cross-reference against Continuance-held material has been formally requested twice and declined twice.</span>\n\nPending Council review before wider circulation, even within Historical Archives.' }
    };

    const state = {
        booted: false,
        loggedIn: false,
        user: { name: 'Senior Researcher (ID: M-7742)', clearance: 'Level 5', facility: 'Streymoy HQ' },
        windows: [
            { id: 'dashboard', title: 'SYSTEM_TELEMETRY', icon: 'activity', x: 50, y: 50, w: 700, h: 450, open: false, maximized: false, zIndex: 1 },
            { id: 'archive', title: 'ARCHIVE_ACCESS', icon: 'database', x: 100, y: 100, w: 800, h: 500, open: false, maximized: false, zIndex: 2 },
            { id: 'map', title: 'FACILITY_SCHEMATICS', icon: 'map', x: 150, y: 80, w: 900, h: 600, open: false, maximized: false, zIndex: 3 },
            { id: 'messages', title: 'COMMS_RELAY', icon: 'mail', x: 200, y: 120, w: 600, h: 400, open: false, maximized: false, zIndex: 4 },
            { id: 'registry', title: 'ANOMALY_REGISTRY', icon: 'microscope', x: 250, y: 150, w: 850, h: 550, open: false, maximized: false, zIndex: 5 },
            { id: 'ranks', title: 'CHAIN_OF_COMMAND', icon: 'users', x: 300, y: 70, w: 950, h: 650, open: true, maximized: false, zIndex: 6 },
            { id: 'anomaly-an5001', title: 'AN-5-001 :: NORTHSTAR', icon: 'ship', x: 120, y: 40, w: 1000, h: 680, open: false, maximized: false, zIndex: 7, hidden: true }
        ],
        highestZ: 10,
        dragState: null,
        resizeState: null,
        
        archivePath: ['root'],
        archiveViewFile: null,
        restrictedUnlocked: false,
        selectedRank: 'r1',
        ranksView: 'list',
        selectedMessage: 'M-101',
        openAttachments: {},
        activeFacility: 'streymoy',
        activeRoom: null,

        showDecryptPanel: false,
        decryptError: '',

        dashboardDetail: null,
        anomalySection: 'entry',
        anomalyLogsOpen: {},
        anomalyLogsProgress: {},
        anomalyLogsTyping: {},
        telemetryStats: { processor: 94.2, resonance: 88.6, relay: 76.4 },
        telemetryLog: [
            'SYNCHRONIZING WITH CRYSTALLINE SUBSYSTEM 0x00... OK',
            'SYNCHRONIZING WITH CRYSTALLINE SUBSYSTEM 0x01... OK',
            'SYNCHRONIZING WITH CRYSTALLINE SUBSYSTEM 0x02... OK',
            'PHOTONIC ARRAY CALIBRATION NOMINAL',
            'DETECTED BACKGROUND ANOMALOUS RADIATION IN SECTOR 4'
        ]
    };

    const DECRYPT_CODE = 'LATTICE-7';
    const audioTimers = {};
