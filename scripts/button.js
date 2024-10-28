window.onload = () => {
    const button = document.getElementById('tuah');
    const socket = new WebSocket('wss://api.soya.place/button');

    socket.addEventListener('open', () => {
        button.disabled = false;
    });

    button.addEventListener('click', () => {
        if (socket.readyState == socket.OPEN) {
            socket.send(JSON.stringify({type:0}));
            button.disabled = true;
            setTimeout(() => { button.disabled = false; }, 1000);
        } else button.disabled = true;
    });
}