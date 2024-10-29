window.onload = () => {
    const button = document.getElementById('tuah');
    const socket = new WebSocket('wss://api.soya.place/button');

    socket.addEventListener('open', () => {
        button.disabled = false;
    });

    let countdown = 1000;
    socket.addEventListener('message', () => {
        try {
            const data = JSON.parse(event.data);
            if (data.type != undefined) {
                switch (data.type) {
                    case 0: { // ButtonResponseType.SetCountdown
                        countdown = data.value;
                    }
                }
            }
        } catch(err) { console.error(err); }
    });

    button.addEventListener('click', () => {
        if (socket.readyState == socket.OPEN) {
            socket.send(JSON.stringify({type:0}));
            button.disabled = true;
            setTimeout(() => { button.disabled = false; }, countdown);
        } else {
            button.disabled = true;
            button.textContent = 'Disconnected. Please refresh to continue spitting on that thang';
        }
    });
}