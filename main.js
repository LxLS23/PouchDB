if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log("Service Worker registrado correctamente ", reg);
            })
            .catch(err => console.error('Service Worker registration failed', err))
    });
}