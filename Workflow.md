# AI Development Workflow Comparison

## Round 1: Vague Prompt

For the first implementation, I used a deliberately vague prompt:

> "Build a professional timeline feature for the capstone project."

The AI independently interpreted the feature as an evidence timeline and created a candidate evidence workspace. It included evidence filters, search, selectable timeline items, a detail panel, skills, evidence confidence, and supporting material.

The implementation was functional in several important areas. The filters worked correctly, search returned matching evidence, and selecting an evidence item updated the detail panel. When a search returned no results, the interface displayed an appropriate "No evidence matches that search" message.

The generated interface also performed reasonably well in basic accessibility checks. The interactive elements could be reached using keyboard navigation and activated with the keyboard. The selected filter could be identified without relying only on color, and selecting timeline evidence with the keyboard updated the detail panel. The search input also had an accessible label.

However, the vague prompt resulted in several assumptions and incomplete functionality. The generated data was hard-coded, and some actions were only visual. "Add to shortlist", "View profile", and "Open evidence" did not perform any action. There was also a data inconsistency: the interface displayed "12 signals" even though only four evidence events existed in the hard-coded dataset.

The implementation also did not include automated tests or a clear verification process. This meant that some issues had to be discovered through manual inspection rather than being caught automatically.

## Round 2

For the second implementation, I will use a fresh session and a precise specification. The prompt will define the expected data structure, behavior, accessibility requirements, edge cases, constraints, and testing requirements. The AI will first inspect the project and create a plan before implementing the feature.

The second implementation will then be compared against this first version based on correctness, accessibility, edge-case handling, testing, and the amount of manual review and correction required.

The goal is to determine whether giving the AI explicit requirements and a verification loop produces a more reliable implementation than relying on a vague prompt.