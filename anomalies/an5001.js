const DB_AN5001_SECTIONS = [
        { id: 'entry', label: 'OBJECT DATA', sub: 'AN-5-001 Entry', icon: 'file-text' },
        { id: 'history', label: 'I. Historical Record', sub: 'Commission Origin', icon: 'book-open' },
        { id: 'discovery', label: 'II. Discovery', sub: '08 AUG 2032', icon: 'search' },
        { id: 'environmental', label: 'III. Interior Survey', sub: 'Environmental Anomalies', icon: 'snowflake' },
        { id: 'recovery', label: 'IV. Recovery Log', sub: '12–14 AUG 2032', icon: 'truck' },
        { id: 'recording', label: 'V. Interior Recordings', sub: 'Helmet Camera', icon: 'mic' },
        { id: 'archives', label: 'VI. Archives Report', sub: 'Historical Archives Div.', icon: 'archive' },
        { id: 'interview', label: 'VII. Interview Record', sub: 'Vinter / Sørensen', icon: 'users' },
        { id: 'findings', label: 'VIII. Current Findings', sub: 'Active Research', icon: 'flask-conical' },
        { id: 'council', label: 'IX. Council Note', sub: 'Directorate Council', icon: 'shield' }
    ];

    function anSectionEntry() {
        return `
        <div class="doc-sheet mb-4" style="max-width:none;">
            <div class="doc-stamp">CLASS 5</div>
            <div class="doc-sheet-header" style="grid-template-columns: repeat(4, 1fr);">
                <div><div class="doc-sheet-field-label">Designation</div><div class="doc-sheet-field-value">AN-5-001</div></div>
                <div><div class="doc-sheet-field-label">Form</div><div class="doc-sheet-field-value">Object / Vessel</div></div>
                <div><div class="doc-sheet-field-label">Availability</div><div class="doc-sheet-field-value">Unique</div></div>
                <div><div class="doc-sheet-field-label">Control</div><div class="doc-sheet-field-value">Conditional / Uncontrolled</div></div>
            </div>
            <div class="doc-sheet-body">
                <p style="margin-bottom:10px;"><strong>Description:</strong> NORTHSTAR is an anomalous research vessel approximately 118 meters in length, originally constructed and operated by the Commission during the final decades of the Masquerade. Hull configuration is unlike any other recovered Commission asset - icebreaker-rated below the waterline, but carrying superstructure and mast arrays with no conventional maritime function, consistent with a platform built to remain stationary near a Rift for extended periods rather than to travel far. The vessel was designed for long-duration Arctic and Rift research expeditions. It was rediscovered beneath approximately 2.7 kilometers of ice in northern Greenland in August 2032, inside a large underground cavern alongside anomalous structures and materials. No crew, bodies, creatures, or other biological remains were found aboard. Several sealed containers of anomalous, non-biological material were recovered from the vessel's forward laboratory and cargo hold; composition and origin remain under review by Materials Science. Several laboratories, living quarters, navigation systems, and experimental systems remain intact, and - against every expectation for a vessel presumed sealed for two decades or more - a portion of those systems are still drawing power. See Section III, Interior Survey. The vessel was recovered only days ago and was transferred to Meridian Headquarters within the week; the great majority of its systems, compartments, and recovered material remain unexamined.</p>
                <p style="margin-bottom:10px;"><strong>Anomalous Properties:</strong> NORTHSTAR was constructed around experimental Commission technology designed to study and interact with Rifts. Its primary system, informally designated the Transit Core, appears capable of temporarily altering local spatial conditions and interacting with Rift boundaries. The vessel can detect certain Rift manifestations at considerable distances and has demonstrated limited effects on the geometry of its internal spaces, including at least one confirmed interior compartment in which measured internal volume does not match the compartment's exterior hull dimensions by <span class="redact" onclick="revealRedact(this)">roughly eleven percent, a discrepancy Materials Science has so far only been able to reproduce, in miniature, inside an active Rift boundary</span>. The full purpose of the Transit Core remains unknown. The technology appears considerably more advanced than most surviving Commission equipment, and Meridian Systems has noted design philosophy overlaps with the Directorate's own photonic computing line that predate any known contact between the two research traditions.</p>
                <p style="margin-bottom:10px;"><strong>Limitations:</strong> The Transit Core cannot currently be reliably activated or controlled. NORTHSTAR cannot currently be used for deliberate inter-reality travel, and the Meridian has been unable to reproduce its technology. The vessel's anomalous systems appear to require specific conditions that researchers have not yet identified. A single compartment adjoining the Core remains outside safe operating temperature range for reasons unrelated to the ambient cold of its burial; see Section III.</p>
                <p style="margin-bottom:10px;"><strong>Access:</strong> The Meridian possesses the entire vessel. It was recently transported from northern Greenland to Meridian Headquarters beneath Streymoy, Faroe Islands, where it is being studied. Physical access to the vessel proper is limited to Historical Archives, Meridian Systems diagnostic staff, and Council-designated observers; the Transit Core compartment specifically requires a second, separate authorization <span class="redact" onclick="revealRedact(this)">that as of this filing only three living Directorate personnel hold</span>.</p>
                <p style="margin-bottom:10px;"><strong>Origin:</strong> NORTHSTAR was constructed by the Commission as part of a classified research program investigating long-duration Rifts and the possibility of using anomalous spatial phenomena for transportation and exploration. The vessel was deployed to the Arctic sometime before Disclosure. Its final known Commission records indicate that it was operating in northern Greenland shortly before the Brooklyn Exposure of 2007. The vessel subsequently disappeared from Commission records. Its crew and the circumstances surrounding its disappearance remain unknown.</p>
                <p style="margin-bottom:10px;"><strong>Current Status:</strong> Contained and under active study at Meridian Headquarters. The Meridian only recently recovered NORTHSTAR and has begun comparing its systems with surviving Commission archives.</p>
                <p style="margin:0;"><strong>Additional Lore:</strong> NORTHSTAR is one of the most significant surviving pieces of Commission technology recovered since the Culling. The Meridian believes the vessel belonged to a research program that was deliberately kept separate from the Commission's primary anomaly registry. Several recovered systems appear to reference research conducted before Disclosure into the relationship between Rifts and physical space. The vessel's navigation systems also contain references to several historical Rift events believed lost with the Commission. Whatever happened to its original crew remains unknown, and the Directorate has not ruled out the possibility that the Commission abandoned the vessel deliberately.</p>
            </div>
            <div class="doc-sheet-footer">AN-5-001 // Historical Archives Division // Distribution restricted to Level 5 clearance and above</div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="tech-border bg-[var(--color-panel)] p-3"><div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Class</div><div class="text-sm font-bold text-[var(--color-amber)]">5 - National</div></div>
            <div class="tech-border bg-[var(--color-panel)] p-3"><div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Recovery</div><div class="text-sm font-bold text-white">Greenland, 2032</div></div>
            <div class="tech-border bg-[var(--color-panel)] p-3"><div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Location</div><div class="text-sm font-bold text-white">Streymoy HQ</div></div>
            <div class="tech-border bg-[var(--color-panel)] p-3"><div class="text-[9px] text-[var(--color-cyan-dim)] uppercase tracking-widest mb-1">Status</div><div class="text-sm font-bold text-[var(--color-cyan)]">Active Research</div></div>
        </div>
        <div class="tech-border bg-[var(--color-panel)] p-3 mt-3 flex items-center gap-3">
            <i data-lucide="image-off" class="w-8 h-8 text-[var(--color-panel-border)] shrink-0"></i>
            <div class="text-[10px] text-[var(--color-text-dim)]">PHOTOGRAPHIC DOCUMENTATION: PENDING. Expedition imaging team clearance for hull and interior photography is pending Council review; recovered helmet-camera stills remain restricted to Historical Archives pending redaction pass.</div>
        </div>
        <div class="tech-border bg-[var(--color-panel)] p-3 mt-3 flex items-center gap-3 border-[var(--color-red)]">
            <i data-lucide="lock" class="w-8 h-8 text-[var(--color-red)] shrink-0"></i>
            <div class="text-[10px] text-[var(--color-text-dim)]">FULL TRANSIT CORE SCHEMATIC AND ACTIVATION LOG: SEALED BY COUNCIL ORDER. <span class="redact" onclick="revealRedact(this)">Not releasable to this terminal at any clearance level currently held by Historical Archives staff.</span></div>
        </div>`;
    }

    function anSectionHistory() {
        return `
        <div class="an-section-title"><i data-lucide="book-open" class="w-4 h-4"></i> I. Historical Record</div>
        <div class="an-prose flex flex-col gap-3">
            <p>NORTHSTAR was constructed by the <strong>Commission</strong> during the latter period of the Masquerade. Surviving records indicate that it belonged to a classified research program investigating <strong>long-duration Rifts</strong>, particularly those occurring in remote environments.</p>
            <p>Unlike conventional Commission facilities, NORTHSTAR was designed to operate independently for extended periods. The vessel was equipped with laboratories, anomalous-material storage, Rift detection systems, experimental computing equipment, and a prototype system capable of interacting with Rift boundaries.</p>
            <p>The program appears to have been highly compartmentalized. Even within the Commission, relatively few personnel appear to have known of the vessel. Cross-referencing against recovered personnel rosters has so far identified no more than a dozen names with any plausible connection to the program, and none of those individuals appear in any surviving post-2007 record. One name recurs across all three surviving documents in a supervisory capacity: <span class="redact" onclick="revealRedact(this)">a Commission program director referred to only by the initials E.H., never a full name, cross-referenced against zero known Commission personnel files recovered to date</span>.</p>
            <p>The last confirmed Commission communication with NORTHSTAR occurred prior to the <strong>Brooklyn Exposure of 2007</strong>. No subsequent communication was recorded.</p>
            <p>During the <strong>Thirty-Six Days</strong>, Commission facilities were seized, personnel disappeared, archives were destroyed or confiscated, and large portions of the organization's infrastructure collapsed. NORTHSTAR was listed as <strong>MISSING</strong> in one surviving Commission logistics record. It was later removed from several versions of the registry. The reason is unknown.</p>
        </div>`;
    }

    function anSectionDiscovery() {
        return `
        <div class="an-section-title"><i data-lucide="search" class="w-4 h-4"></i> II. Discovery</div>
        <div class="an-prose flex flex-col gap-3">
            <p>On <strong>8 August 2032</strong>, Meridian North Atlantic monitoring systems detected an anomalous geological signature beneath northern Greenland. The initial investigation was classified as a routine Rift survey, part of the standing effort to catalogue long-duration manifestations across the North Atlantic basin.</p>
            <p>At approximately 2.7 kilometers beneath the ice, the expedition discovered an artificial cavern. Inside was NORTHSTAR.</p>
            <p>The vessel was partially surrounded by crystalline deposits and unidentified metallic structures, consistent in composition with materials the Materials Science division has previously catalogued as Rift-adjacent, though notably absent of any active Rift signature. No Rift large enough to accommodate the vessel was present at the time of discovery, nor is there any geological evidence - cavern deformation, melt-refreeze striation, structural scarring - consistent with one having been present recently.</p>
            <p>No impact damage was observed. No crew, creatures, or biological remains were found. Several sealed containers of anomalous, non-biological material were recovered from within the vessel itself, separate from the crystalline deposits and metallic structures noted in the surrounding cavern.</p>
            <p>The vessel was subsequently identified through comparison with recovered Commission records. The name appeared in only three surviving documents. All three had been classified <strong>BLACK / COMMISSION INTERNAL</strong>.</p>
            <p>Follow-up ice-core dating of the surrounding formation places the cavern's sealed condition at a minimum of two decades prior to discovery, and Materials Science has not ruled out a considerably longer figure pending isotope analysis. The current working hypothesis - unconfirmed - is that the cavern was not a natural void the vessel later occupied, but was shaped around the vessel by some process not yet understood.</p>
            <p>The initial boarding team's first readings inside the hull did not match a vessel that had sat dead and unpowered under the ice for two decades. Instrument findings from that entry are detailed separately in Section III, Interior Survey.</p>
        </div>`;
    }

    function anSectionEnvironmental() {
        return `
        <div class="an-section-title"><i data-lucide="snowflake" class="w-4 h-4"></i> III. Interior Survey - Environmental Anomalies</div>
        <div class="an-prose flex flex-col gap-3">
            <p>Prior to any detailed research pass, the initial boarding team logged a set of interior readings that Meridian Systems has classified as anomalous in their own right, independent of any confirmed Transit Core activity. This section summarizes those findings for researchers who do not require the full instrument logs.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-cyan)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="battery" class="w-3 h-3"></i> Residual Power</div>
                    <p class="text-xs text-[var(--color-text-dim)] leading-relaxed">Roughly forty percent of interior lighting circuits and the entirety of the Transit Core compartment's systems register a live power draw from a source Meridian Systems has not yet identified. The vessel's conventional reactor plant is confirmed cold and has been for a considerable period. Whatever is feeding the Core compartment is not on the same grid as the rest of the ship.</p>
                </div>
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-cyan)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="thermometer" class="w-3 h-3"></i> Localized Cold</div>
                    <p class="text-xs text-[var(--color-text-dim)] leading-relaxed">The corridor immediately outside the Transit Core bulkhead runs measurably colder than every other compartment aboard, including sections with no heating at all. The gradient is not gradual - it begins abruptly at a bulkhead seam roughly four meters from the door and has held constant across eleven separate readings taken since arrival at Streymoy.</p>
                </div>
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="droplet" class="w-3 h-3"></i> Suspended Condensation</div>
                    <p class="text-xs text-[var(--color-text-dim)] leading-relaxed">Helmet-camera footage from the second interior recording (Section V) shows several droplets of condensation on a corridor pipe run that do not fall, drip, or visibly evaporate across eleven minutes of continuous recording. Materials Science has reviewed the footage frame by frame and cannot rule out a recording artifact, but has also been unable to reproduce one.</p>
                </div>
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="volume-x" class="w-3 h-3"></i> Acoustic Dampening</div>
                    <p class="text-xs text-[var(--color-text-dim)] leading-relaxed">Sound recorded within roughly ten meters of the Transit Core bulkhead is measurably quieter than the same equipment records elsewhere aboard, independent of any deliberate soundproofing in the original construction. Boarding personnel have independently described the same stretch of corridor, unprompted, as feeling like it is "holding its breath."</p>
                </div>
            </div>
            <p class="mt-1">None of the above has been confirmed as an effect of the Transit Core specifically. Meridian Systems' working assumption is that they are related, given their concentration around the same compartment, but the Core itself remains sealed and unpowered by any means the Directorate has authorized, which leaves the actual mechanism for all four effects officially unexplained.</p>
        </div>`;
    }

    function anSectionRecovery() {
        return `
        <div class="an-section-title"><i data-lucide="truck" class="w-4 h-4"></i> IV. Recovery Log</div>
        <div class="an-prose flex flex-col gap-3">
            <p><strong>Date:</strong> 12–14 August 2032</p>
            <p>The Meridian Expeditionary Division spent approximately forty hours preparing NORTHSTAR for extraction. The vessel could not be dismantled without risking damage to its anomalous systems. A specialized transport operation was therefore conducted. The Transit Core compartment was not powered down, isolated, or otherwise interfered with prior to transport; it was moved exactly as found.</p>
            <p>NORTHSTAR was extracted from the Greenland cavern and transported across the North Atlantic under Meridian cover, routed through the Iceland Station staging point to avoid a single direct transit leg that External Operations judged too difficult to cover convincingly on short notice. It arrived at the Faroe Islands on <strong>14 August 2032</strong>. <span class="redact" onclick="revealRedact(this)">The cover story presented to the two civilian shipping contractors briefly involved in the Iceland leg identified the cargo as decommissioned oceanographic survey equipment; both contractors have since been quietly moved to unrelated Meridian-front contracts</span>.</p>
            <p>The vessel was transferred directly into a newly constructed subterranean research chamber beneath Meridian Headquarters, excavated and reinforced in the seventy-two hours between the Greenland discovery and the vessel's arrival - an engineering effort External Operations has since flagged internally as one of the more difficult covers the division has maintained, requiring the temporary rerouting of two front-organization drilling contracts to explain the equipment movement.</p>
            <p class="text-[var(--color-amber)]">No external organization has been informed of the recovery.</p>
        </div>`;
    }

    function anSectionRecording() {
        const log1 = renderAudioLog('an5001-log-1', {
            title: 'First Interior Recording',
            subtitle: 'Expedition Helmet Camera - J. Vinter',
            duration: '00:58',
            lines: [
                { time: '00:00', text: '[Recording begins mid-motion. Wind noise, heavy breathing. Ice axe strikes twice, then stops.]' },
                { time: '00:02', speaker: 'VINTER', text: '- careful, careful, hold up-' },
                { time: '00:03', speaker: 'VINTER', text: "That's a ship." },
                { time: '00:05', speaker: 'MORA', text: 'No way.' },
                { time: '00:06', text: '[Footsteps on loose rock. Someone exhales sharply.]' },
                { time: '00:07', speaker: 'VINTER', text: 'Get the lights on it. Both of you, on my count.' },
                { time: '00:11', text: '[Two handheld floodlights power on. Hull surface illuminated in sections.]' },
                { time: '00:13', speaker: 'MORA', text: 'What the hell is that?' },
                { time: '00:15', speaker: 'VINTER', text: "I don't know. Hold the light steady, Anja, I'm losing the top edge." },
                { time: '00:19', speaker: 'MORA', text: "We're under Greenland." },
                { time: '00:21', speaker: 'VINTER', text: 'I know.' },
                { time: '00:24', speaker: 'MORA', text: "There's a ship under Greenland." },
                { time: '00:26', speaker: 'VINTER', text: 'I know, Anja. I heard you the first time.' },
                { time: '00:29', text: '[Long pause. Wind noise fades - team has moved further into the cavern, out of the surface draft.]' },
                { time: '00:32', speaker: 'MORA', text: 'Wait.' },
                { time: '00:33', speaker: 'VINTER', text: 'What?' },
                { time: '00:34', speaker: 'MORA', text: "Meridian registry. That's a Meridian registry stencil." },
                { time: '00:35', speaker: 'VINTER', text: 'Where - where, show me.' },
                { time: '00:36', speaker: 'MORA', text: 'Hull, port side, up near the bow.' },
                { time: '00:38', text: '[Camera pans and zooms. Autofocus hunts twice before settling.]' },
                { time: '00:40', speaker: 'MORA', text: "That's not ours. Elias, that's not one of our stencils, that's - that's Commission lettering." },
                { time: '00:42', speaker: 'VINTER', text: '...' },
                { time: '00:43', speaker: 'MORA', text: 'Elias?' },
                { time: '00:44', speaker: 'VINTER', text: "Don't transmit that yet. Don't key the relay." },
                { time: '00:45', speaker: 'MORA', text: 'Why? Elias, why-' },
                { time: '00:46', speaker: 'VINTER', text: "Because if that's what I think it is, I want Streymoy hearing it from a report, not a live feed with everyone's callsign attached to the panic." },
                { time: '00:47', speaker: 'MORA', text: "So what is it?" },
                { time: '00:48', speaker: 'VINTER', text: "We've just found something the Commission lost." },
                { time: '00:53', text: '[Pause. Distant sound, possibly settling ice, possibly structural. Neither speaker reacts to it.]' },
                { time: '00:56', speaker: 'MORA', text: "You're smiling. This is insane and you're smiling." },
                { time: '00:58', speaker: 'VINTER', text: "[laughs, unsteady] Yeah. Ask me again once we're inside." }
            ]
        });

        const log2 = renderAudioLog('an5001-log-2', {
            title: 'Second Interior Recording',
            subtitle: 'Expedition Helmet Camera - A. Mora, Deck 2, Crew Quarters',
            duration: '01:22',
            lines: [
                { time: '00:00', text: '[Hatch cycles open with a hydraulic groan, then a hard metallic clang - hinge unused for years, not decades of neglect.]' },
                { time: '00:02', text: '[Interior lighting non-functional. Helmet lamp only. Boots on decking, steady, deliberate pace.]' },
                { time: '00:05', speaker: 'MORA', text: 'Doors are all open down here. Every one of them.' },
                { time: '00:10', speaker: 'VINTER', text: '[over radio, slight static] Forced, or just open?' },
                { time: '00:12', speaker: 'MORA', text: 'Just open. No damage on the frames, no forced latches. Somebody left in an orderly line, or nobody ever locked up behind themselves at all.' },
                { time: '00:18', text: '[Camera pans across bunks. Bedding undisturbed, folded, corners squared.]' },
                { time: '00:22', speaker: 'MORA', text: "Bunks are made. Everything's made. It's like a barracks inspection down here, not an abandoned ship." },
                { time: '00:26', speaker: 'VINTER', text: '[radio] Like nobody slept in them, or like nobody got up in a hurry?' },
                { time: '00:29', speaker: 'MORA', text: "Second one. There's a cup on this table. It's not spilled, it's not even - hang on." },
                { time: '00:33', text: '[Camera moves closer. A faint ring of dried residue is visible at the base of the cup, nothing above it.]' },
                { time: '00:35', text: "[Pause. Faint structural creak, low frequency, unexplained. Mora's breathing audibly changes.]" },
                { time: '00:38', speaker: 'MORA', text: 'Did you hear that?' },
                { time: '00:39', speaker: 'VINTER', text: "[radio] Hull settling. We moved it two days ago, it's still adjusting." },
                { time: '00:44', speaker: 'MORA', text: "That's not what that sounded like. That sounded like it came from further in." },
                { time: '00:47', speaker: 'VINTER', text: '[radio] Noted. Keep moving, keep talking to me.' },
                { time: '00:50', text: '[Camera reaches a bulkhead door stenciled TRANSIT CORE - AUTHORIZED PERSONNEL. Door is sealed. A dull amber indicator glows above the frame, unpowered by any visible source.]' },
                { time: '00:53', speaker: 'MORA', text: "Elias. This one has a light on." },
                { time: '00:55', speaker: 'VINTER', text: '[radio] Say again?' },
                { time: '00:56', speaker: 'MORA', text: "There's a status light. Above the door. It's on. This whole ship is dead and this one light is on." },
                { time: '00:57', speaker: 'VINTER', text: '[radio, after a pause] That one stays locked until Systems clears it. Do not touch the door. Log the marking and back out.' },
                { time: '01:04', speaker: 'MORA', text: "There's writing on it too. Under the stencil." },
                { time: '01:07', speaker: 'VINTER', text: '[radio] What does it say?' },
                { time: '01:09', speaker: 'MORA', text: "I can't tell. It's scratched in, not printed. Deep, like it was done with something other than a tool. The edges look... clean. Not rushed." },
                { time: '01:14', text: '[Long pause. The low structural creak repeats, closer.]' },
                { time: '01:16', speaker: 'MORA', text: 'Elias, I want to leave now.' },
                { time: '01:18', speaker: 'VINTER', text: "[radio] Photograph it first. Then go. I mean it, Anja - photograph it, then go." },
                { time: '01:22', text: '[Camera flash. Footsteps retreating, faster than the approach.]' }
            ]
        });

        const log3 = renderAudioLog('an5001-log-3', {
            title: 'Third Interior Recording - Fragment',
            subtitle: 'Recovered Helmet Unit, Owner Unconfirmed - Deck 2 / Deck 3 Stairwell',
            duration: '00:41 (partial, incomplete)',
            lines: [
                { time: '00:00', text: '[Fragment begins already in progress. Heavy static. Audio partially unintelligible throughout.]' },
                { time: '00:03', text: '[UNINTELLIGIBLE - possible speech]' },
                { time: '00:08', speaker: 'UNKNOWN', text: "...didn't come from the door, it came from-" },
                { time: '00:11', text: '[STATIC BURST. Video artifacting reported but not preserved in this transcript.]' },
                { time: '00:15', text: '[UNINTELLIGIBLE]' },
                { time: '00:19', speaker: 'UNKNOWN', text: "-count them again, there were only supposed to be-" },
                { time: '00:23', text: '[Signal degrades further. A rhythmic ticking or tapping is audible beneath the static for approximately four seconds; Meridian Systems has not matched it to any equipment carried by the boarding team.]' },
                { time: '00:29', text: '[UNINTELLIGIBLE]' },
                { time: '00:34', speaker: 'UNKNOWN', text: "-it's fine, it's fine, we're fine, just get to the-" },
                { time: '00:38', text: '[Signal lost. Recording ends without a clean stop; the final logged frame is corrupted rather than cut.]' }
            ]
        });

        const log4 = renderNorthstarAudioLog(AN5001_AUDIO_ID, {
            title: 'Fourth Recording - Recovered Audio Buffer',
            subtitle: 'Transit Core Comms Buffer - Origin Unconfirmed',
            duration: '01:40 (looping, has not stopped)',
            lines: [
                { time: '00:00', text: '[Playback initiated. Tape transport engages with an audible spin-up whine.]' },
                { time: '00:04', text: 'SPECTRAL LOCK: ACQUIRING...' },
                { time: '00:09', text: 'Periodic harmonic structure detected. Repeats roughly every 2.1 seconds.' },
                { time: '00:14', text: 'Pattern does not match any standard Commission or Continuance broadcast encoding.' },
                { time: '00:20', text: '[SIGNAL INTERFERENCE - WAVEFORM UNREADABLE FOR SEVERAL SECONDS]' },
                { time: '00:27', text: 'Recovers unprompted each time. No operator intervention logged at any recovery point.' },
                { time: '00:33', text: 'A voice-shaped component is present within the tonal layer. Formant structure is unstable.' },
                { time: '00:40', text: '[STATIC BURST. Meridian Systems flags a momentary spike on an unassigned frequency band.]' },
                { time: '00:47', speaker: 'ARCHIVIST PRIME', text: 'Recommend no further playback pending Materials Science review.' },
                { time: '00:54', text: 'Buffer has not stopped looping since NORTHSTAR arrived at Streymoy.' },
                { time: '01:01', text: 'Review has been pending for three weeks. The buffer is still playing.' }
            ]
        });

        return `
        <div class="an-section-title"><i data-lucide="mic" class="w-4 h-4"></i> V. Interior Recordings</div>
        <div class="an-prose">
            <p><strong>Source:</strong> Expedition Helmet Camera &bull; <strong>Date:</strong> 08/08/2032</p>
            <p class="mt-2">Three segments of helmet-camera footage from the initial Greenland entry have been recovered. Two have been fully transcribed and cleared for Level 5 review. Audio and video quality across all three is degraded in places by interference consistent with the crystalline deposits surrounding the cavern; Meridian Systems has not been able to fully account for the interference pattern, nor for why it appears to intensify specifically in proximity to the Transit Core bulkhead. Transcripts below are subtitle-synchronized to the recovered timecode where legible.</p>
            <p class="mt-2">A fourth item, unrelated to the helmet-camera footage, was pulled directly from the Transit Core's comms buffer during initial diagnostics. It carries no video component, and the buffer was already mid-loop when Systems staff first accessed it - there is no recorded start point on file, only a recovery point.</p>
        </div>
        ${log1}
        ${log2}
        ${log3}
        ${log4}`;
    }

    function anSectionArchives() {
        return `
        <div class="an-section-title"><i data-lucide="archive" class="w-4 h-4"></i> VI. Historical Archives Report</div>
        <div class="an-prose flex flex-col gap-3">
            <p>Historical Archives Division personnel were able to identify NORTHSTAR through recovered Commission documentation. The oldest surviving reference describes it as:</p>
            <div class="tech-border bg-[var(--color-panel)] p-3 text-white text-sm italic">"Polar Research Vessel - Long Duration Rift Survey Platform."</div>
            <p>A second document, a maintenance requisition rather than a research summary, references an experimental system designated <strong>Transit Core</strong> and a supply request for equipment Materials Science has been unable to identify by name: <span class="redact" onclick="revealRedact(this)">"stabilization medium, second formulation," quantity and composition both withheld even in the surviving requisition, as though the requester assumed the recipient already knew what was being asked for</span>.</p>
            <p>A third document contains only a partial sentence:</p>
            <div class="tech-border bg-[var(--color-panel)] p-3 text-white text-sm italic">"If NORTHSTAR fails to return, all associated research is to be-"</div>
            <p>The remainder of the document is missing. No record explains why the vessel was abandoned.</p>
            <p>Taken together, the three documents describe a program less concerned with what the vessel might discover than with what should happen if it did not come back - a tone Historical Archives has not observed in any other surviving Commission research file of comparable scale. Most Commission programs planned for failure by budgeting for another attempt. This one appears to have planned for containment.</p>
        </div>`;
    }

    function anSectionInterview() {
        const interview = renderAudioLog('an5001-log-interview', {
            title: 'Interview Record - Dr. Elias Vinter',
            subtitle: 'Interviewer: Dr. Ingrid Sørensen - 15 AUG 2032',
            duration: '03:30',
            lines: [
                { time: '00:04', speaker: 'SØRENSEN', text: 'You knew what it was when you saw the hull.' },
                { time: '00:08', speaker: 'VINTER', text: 'I knew what the markings meant.' },
                { time: '00:11', speaker: 'SØRENSEN', text: 'You recognized the Commission?' },
                { time: '00:13', speaker: 'VINTER', text: 'Everyone in Historical Archives recognizes Commission markings.' },
                { time: '00:17', speaker: 'SØRENSEN', text: "Not everyone recognizes experimental Commission vessels." },
                { time: '00:21', speaker: 'VINTER', text: "That's because there aren't supposed to be any left." },
                { time: '00:26', speaker: 'SØRENSEN', text: 'How old is NORTHSTAR?' },
                { time: '00:28', speaker: 'VINTER', text: "We don't know." },
                { time: '00:30', speaker: 'SØRENSEN', text: 'We have Commission records.' },
                { time: '00:32', speaker: 'VINTER', text: "Records tell us when it was built. They don't tell us when it stopped being ours." },
                { time: '00:38', speaker: 'SØRENSEN', text: 'Explain.' },
                { time: '00:40', speaker: 'VINTER', text: 'The vessel was already classified missing before Disclosure.' },
                { time: '00:45', speaker: 'SØRENSEN', text: 'So the Commission lost it.' },
                { time: '00:47', speaker: 'VINTER', text: 'Apparently.' },
                { time: '00:49', speaker: 'SØRENSEN', text: 'And nobody ever found it?' },
                { time: '00:51', speaker: 'VINTER', text: 'Not until us.' },
                { time: '00:54', speaker: 'SØRENSEN', text: 'What happened to the crew?' },
                { time: '00:56', speaker: 'VINTER', text: "That's what we're trying to determine." },
                { time: '01:01', speaker: 'SØRENSEN', text: 'Do you think they\'re still alive?' },
                { time: '01:04', speaker: 'VINTER', text: 'No.' },
                { time: '01:06', speaker: 'SØRENSEN', text: 'Why?' },
                { time: '01:07', speaker: 'VINTER', text: "Because if they were alive, I'd expect to find something." },
                { time: '01:12', speaker: 'SØRENSEN', text: 'And you found nothing.' },
                { time: '01:14', speaker: 'VINTER', text: 'Exactly.' },
                { time: '01:16', speaker: 'SØRENSEN', text: 'So where did they go?' },
                { time: '01:19', speaker: 'VINTER', text: "I think that's what NORTHSTAR was built to find out." },
                { time: '01:24', speaker: 'SØRENSEN', text: 'Find out what?' },
                { time: '01:26', speaker: 'VINTER', text: 'Where the Rifts actually go.' },
                { time: '01:34', text: '[Pause. 6 seconds.]' },
                { time: '01:41', speaker: 'SØRENSEN', text: 'The bunks were made. Mora\'s notes say the bunks were made, like no one left in a hurry.' },
                { time: '01:47', speaker: 'VINTER', text: "I read that." },
                { time: '01:49', speaker: 'SØRENSEN', text: 'What does that tell you?' },
                { time: '01:52', speaker: 'VINTER', text: "It tells me whatever happened, happened in a way the crew expected to come back from." },
                { time: '01:59', speaker: 'SØRENSEN', text: 'They were planning to return.' },
                { time: '02:01', speaker: 'VINTER', text: 'That\'s my reading, yes.' },
                { time: '02:04', speaker: 'SØRENSEN', text: 'And the Transit Core door. The marking Mora photographed.' },
                { time: '02:09', speaker: 'VINTER', text: "I've seen the photograph." },
                { time: '02:11', speaker: 'SØRENSEN', text: 'Can you read it?' },
                { time: '02:13', speaker: 'VINTER', text: 'Not yet. It is not a script Historical Archives has on file, and it was scratched into painted steel by hand, which tells me it was written after the vessel was already sealed down here, not before it left dock.' },
                { time: '02:26', speaker: 'SØRENSEN', text: 'By the crew.' },
                { time: '02:28', speaker: 'VINTER', text: 'By someone. I am not prepared to say who.' },
                { time: '02:34', speaker: 'SØRENSEN', text: 'Last question. If the Commission built this to find out where the Rifts go, and it came back empty, with the door written on from the inside - do you think it succeeded?' },
                { time: '02:47', speaker: 'VINTER', text: 'I think it came back. I am not convinced anyone came back with it.' },
                { time: '02:52', text: '[Long pause. 9 seconds. Recording equipment picks up a chair shifting.]' },
                { time: '03:01', speaker: 'SØRENSEN', text: 'Off the record, Elias.' },
                { time: '03:03', speaker: 'VINTER', text: 'This is being recorded.' },
                { time: '03:04', speaker: 'SØRENSEN', text: 'I know. Answer it anyway.' },
                { time: '03:08', speaker: 'VINTER', text: '<span class="redact" onclick="revealRedact(this)">I do not think the crew are dead. I think dead is the version of this we would know how to file.</span>' },
                { time: '03:19', text: '[Pause.]' },
                { time: '03:22', speaker: 'SØRENSEN', text: "That's not an answer, Elias." },
                { time: '03:24', speaker: 'VINTER', text: "It's the only one I have. Are we done?" },
                { time: '03:26', speaker: 'SØRENSEN', text: "We're done." },
                { time: '03:30', text: '[END RECORDING]' }
            ]
        });
        return `
        <div class="an-section-title"><i data-lucide="users" class="w-4 h-4"></i> VII. Interview Record</div>
        <div class="an-prose mb-1">
            <p><strong>Interviewed:</strong> Dr. Elias Vinter &bull; <strong>Interviewer:</strong> Dr. Ingrid Sørensen &bull; <strong>Date:</strong> 15 August 2032</p>
        </div>
        ${interview}`;
    }

    function anSectionFindings() {
        return `
        <div class="an-section-title"><i data-lucide="flask-conical" class="w-4 h-4"></i> VIII. Current Findings</div>
        <div class="an-prose flex flex-col gap-3">
            <p>The Meridian has confirmed that NORTHSTAR was a genuine Commission asset. The vessel was not designed as a military weapon. Its primary purpose appears to have been <strong>Rift research and long-duration exploration</strong>.</p>
            <p>However, the experimental Transit Core represents a significant technological capability. The Meridian has not determined whether the Commission successfully demonstrated controlled Rift transportation. Research remains ongoing.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-cyan)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3"></i> Confirmed</div>
                    <ul class="text-xs text-[var(--color-text-dim)] list-disc pl-4 flex flex-col gap-1.5">
                        <li>Vessel is an authentic pre-Disclosure Commission asset.</li>
                        <li>Vessel was listed MISSING prior to the Brooklyn Exposure.</li>
                        <li>No crew, creatures, or biological trace recovered aboard.</li>
                        <li>Sealed containers of anomalous, non-biological material were recovered from within the vessel; composition and origin unidentified, currently in Materials Science custody.</li>
                        <li>Transit Core exists as a discrete, sealed subsystem.</li>
                        <li>Recovery cavern shows no evidence of impact or forced entry.</li>
                        <li>Portions of the Transit Core compartment remain powered by an unidentified source (Section III).</li>
                    </ul>
                </div>
                <div class="tech-border bg-[var(--color-panel)] p-3">
                    <div class="text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="help-circle" class="w-3 h-3"></i> Unresolved</div>
                    <ul class="text-xs text-[var(--color-text-dim)] list-disc pl-4 flex flex-col gap-1.5">
                        <li>Fate of the original crew.</li>
                        <li>Origin and translation of the handwritten marking on the Transit Core door.</li>
                        <li>Mechanism by which the cavern formed around the vessel.</li>
                        <li>Whether the Transit Core was ever successfully activated by the Commission.</li>
                        <li>Whether the vessel's disappearance from Commission registries was accidental or deliberate.</li>
                        <li>Identity and current whereabouts of the crew.</li>
                        <li><span class="redact" onclick="revealRedact(this)">Whether the unidentified UNKNOWN speaker in the third helmet-camera fragment is one of the four boarding personnel using an unassigned callsign, or someone else entirely</span> - Council Eyes Only.</li>
                    </ul>
                </div>
            </div>
        </div>`;
    }

    function anSectionCouncil() {
        return `
        <div class="an-section-title"><i data-lucide="shield" class="w-4 h-4"></i> IX. Directorate Council Note</div>
        <div class="doc-sheet" style="max-width:none;">
            <div class="doc-stamp">OMEGA</div>
            <div class="doc-sheet-body italic" style="font-size:13px; line-height:1.9;">
                NORTHSTAR is not merely an anomaly.<br><br>
                It is evidence.<br><br>
                Evidence that the Commission was investigating Rift transportation before Disclosure.<br><br>
                Evidence that some of their research survived the Culling.<br><br>
                And potentially evidence that the Commission knew considerably more about the nature of Rifts than we have recovered.<br><br>
                We spent twenty-three years believing the Commission's greatest secrets were hidden in its archives.<br><br>
                We may have been looking in the wrong place.<br><br>
                <strong style="color:#17140f;">The ship was still out there.</strong><br>
                <strong style="color:#17140f;">And now it is ours.</strong><br><br>
                One more note, for the record, not for circulation: something aboard that vessel has been running for twenty-five years with no crew to maintain it and no reactor to power it.<br><br>
                <span class="redact" onclick="revealRedact(this)">Until we know what that something is, I want two names on file who are authorized to shut it off, and I want both of those names to be people I trust to actually do it.</span>
            </div>
            <div class="doc-sheet-footer">Filed by order of the Directorate Council &bull; Distribution: Council record only</div>
        </div>`;
    }

    function renderAnomalyAN5001() {
        const section = state.anomalySection || 'entry';
        const sectionRenderers = {
            entry: anSectionEntry, history: anSectionHistory, discovery: anSectionDiscovery,
            environmental: anSectionEnvironmental,
            recovery: anSectionRecovery, recording: anSectionRecording, archives: anSectionArchives,
            interview: anSectionInterview, findings: anSectionFindings, council: anSectionCouncil
        };
        const navHtml = DB_AN5001_SECTIONS.map(s => `
            <div onclick="setAnomalySection('${s.id}')" class="anomaly-nav-btn ${section === s.id ? 'active' : ''}">
                <i data-lucide="${s.icon}" class="w-3.5 h-3.5 ${section === s.id ? 'text-[var(--color-cyan)]' : 'text-[var(--color-cyan-dim)]'} shrink-0"></i>
                <div class="min-w-0">
                    <div class="text-[10px] font-bold uppercase tracking-wide ${section === s.id ? 'text-white' : 'text-[var(--color-text-dim)]'} truncate">${s.label}</div>
                    <div class="text-[8px] text-[var(--color-cyan-dim)] uppercase truncate">${s.sub}</div>
                </div>
            </div>`).join('');

        return `
        <div class="w-full h-full flex flex-col md:flex-row font-mono-tech bg-black">
            <div class="w-full md:w-64 md:shrink-0 flex flex-col bg-[#04080c] border-b md:border-b-0 md:border-r border-[var(--color-panel-border)]">
                <div class="bg-[var(--color-panel)] p-3 border-b border-[var(--color-amber)]">
                    <div class="flex items-center gap-2 mb-1">
                        <i data-lucide="ship" class="w-4 h-4 text-[var(--color-amber)]"></i>
                        <span class="text-xs text-white font-bold tracking-widest">AN-5-001</span>
                    </div>
                    <div class="text-[9px] text-[var(--color-amber)] tracking-[0.2em]">NORTHSTAR</div>
                    <div class="flex flex-wrap gap-1 mt-2">
                        <span class="an-badge classify-level5" style="color:var(--color-amber);">CLASS 5</span>
                        <span class="an-badge" style="color:var(--color-text-dim);">UNIQUE</span>
                        <span class="an-badge" style="color:var(--color-cyan-dim);">ACTIVE RESEARCH</span>
                    </div>
                </div>
                <div class="max-h-[26vh] md:max-h-none md:flex-1 overflow-y-auto custom-scrollbar py-1" data-scroll-id="anomaly-nav">
                    ${navHtml}
                </div>
            </div>
            <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4" data-scroll-id="anomaly-content">
                ${sectionRenderers[section] ? sectionRenderers[section]() : anSectionEntry()}
            </div>
        </div>`;
    }
