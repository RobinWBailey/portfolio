# Inline key deliverables QA

final result: passed

## Scope and visual target

- Selected visual: option 1, Quiet inline highlights.
- Source visual truth: `/Users/RobinBailey/.codex/generated_images/01a16e9d-8ed3-7b92-973b-01eec81f954e/exec-6124f1e2-568c-404a-87a0-034ee578b98d.png`.
- User instruction: add compact inline deliverables while preserving existing typography, layout, and controls.
- Applied to MyPlymouth and PULSE, with the same optional component in the project archive.

## Evidence and normalization

- Desktop viewport: 1280 × 720 CSS pixels; light theme, closed project state.
- Source: 1672 × 941 pixels, component exploration rather than a complete page.
- Browser implementation: `/private/tmp/portfolio-deliverables-desktop.png`, 1265 × 712 image pixels; browser capture excludes the scrollbar/frame edge.
- Full-view comparison: `/private/tmp/portfolio-deliverables-full-comparison.png`. Source and implementation normalized to 1280 × 720 each and combined side by side.
- Focused comparison: `/private/tmp/portfolio-deliverables-focused-comparison.png`. Source project crop 740 × 260 normalized to 536 pixels wide, alongside a 536 × 185 implementation crop. Checks readable label hierarchy, inline separators, wrapping, and divider placement.
- PULSE desktop: `/private/tmp/portfolio-deliverables-pulse-desktop.png`.
- Mobile viewport: 390 × 844 CSS pixels; `/private/tmp/portfolio-deliverables-mobile.png` and `/private/tmp/portfolio-deliverables-pulse-mobile.png`.
- Tablet viewport: 820 × 900 CSS pixels.
- Final page capture: `/private/tmp/portfolio-deliverables-final.png`.

## Findings

No actionable P0, P1, or P2 findings in the comparison or interaction checks.

The reference places two standalone examples side by side. The implementation retains the existing role-based page arrangement, original summaries, title and date styling, and existing plus controls, as explicitly requested. The mock's separate Read project details row and rollout note were not added. These are intentional scope differences, not fidelity defects.

## Required fidelity surfaces

- Fonts and typography: existing Inter and size tokens retained; 14px deliverables, 12px understated uppercase label. Existing titles, summaries, dates, and prose unchanged. Text wraps naturally without truncation.
- Spacing and layout rhythm: 12px gap above the deliverable label, compact inline list, and existing 14px bottom spacing. Divider moves below deliverables only on projects containing them. Other rows and the two-column work layout remain unchanged.
- Colors and tokens: existing ink, muted, paper, and rule tokens used throughout; no new colors, chips, surfaces, or shadows.
- Image quality and assets: no added raster assets. Existing logos and Lucide controls preserved. Generated mock is used only as design reference.
- Copy and content: six confirmed capabilities per umbrella project, sourced from the interview. Student enquiry tracking is distinguished from future self-service enquiry creation. No unconfirmed metrics or future chatbot capabilities added.

## Interaction and responsive checks

- All six deliverables remain visible with each project collapsed and expanded.
- MyPlymouth tested with pointer and Enter; PULSE tested with Space. Expanded state and detail visibility update correctly.
- Deliverables use an accessible named list outside the disclosure button and hidden detail panel.
- No horizontal overflow at 1280px, 820px, or 390px.
- Mobile highlights wrap without clipping; no carousel, secondary disclosure, or hidden additional items.
- Archive retains all 21 projects and shows both deliverable lists at desktop and mobile widths.
- Browser warning/error log is empty after interaction and navigation checks.
- JSON parsing, TypeScript, production build, and diff whitespace checks passed.

## Comparison history

Initial full-view and focused comparison passed; no P0/P1/P2 fixes or visual iterations were required.

## Implementation checklist

- [x] Optional keyDeliverables data field and shared renderer.
- [x] Confirmed MyPlymouth and PULSE deliverables.
- [x] Always-visible compact treatment using existing typography.
- [x] Existing accordion controls and archive retained.
- [x] Visual comparison, keyboard interaction, responsive, and build checks.

## Follow-up polish

Additional projects can receive deliverables as their content is confirmed in the interview.
