import { getSiblings } from "../../../../js/util/getSiblings";

export function toggleReceivedSentState(state) {
    state.forEach(el => el.addEventListener('click', function() {
        this.classList.add('active');
        const siblings = getSiblings(this);
        siblings.forEach(sibling => sibling.classList.remove('active'));
    }))
}