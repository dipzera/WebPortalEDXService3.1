export function popUpMessage(main, message) {
    main.innerHTML += `
        <div class="message-container"> 
            <p class="message-text">${message}</p>
            <button class="message__close-btn" type="button"><img src="src/img/close.svg" width="13px"></button>
        </div>;
    `;
    setTimeout(() => {
        document.querySelector('.message-container').classList.add('hidden');
    }, 3000);
    document.querySelector('.message__close-btn').addEventListener('click', function() {
        document.querySelector('.message-container').classList.add('hidden');
    })
}