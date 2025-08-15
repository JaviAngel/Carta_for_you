function createDecorations() {
    const container = document.getElementById('decoration-container');
    const heartCount = 40;
    const flakeCount = 60;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 2 + 2.5}rem`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.animationDuration = `${10 + Math.random() * 15}s`;
        container.appendChild(heart);
    }

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.classList.add('gold-flake');
        flake.style.left = `${Math.random() * 100}%`;
        const size = 10 + Math.random() * 25;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        if (Math.random() > 0.5) {
            flake.style.borderRadius = '3px';
            flake.style.transform = 'rotate(45deg)';
        }
        flake.style.animationDelay = `${Math.random() * 10}s`;
        flake.style.animationDuration = `${15 + Math.random() * 25}s`;
        container.appendChild(flake);
    }
}

function createModalHearts() {
    const container = document.getElementById('modalHearts');
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 3 + 2}rem`;
        const colors = ['#e83f8e', '#c72a7a', '#f8e9f5', '#d91a6c'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.animationDuration = `${8 + Math.random() * 12}s`;
        container.appendChild(heart);
    }
}

function updateDateTime() {
    const now = new Date();

    document.getElementById('current-date').textContent = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('current-time').textContent = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createDecorations();
    createModalHearts();
    updateDateTime();
    setInterval(updateDateTime, 1000);

    document.getElementById('scrollDown').addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('.love-letter').offsetTop,
            behavior: 'smooth'
        });
    });

    const modal = document.getElementById('surpriseModal');
    const btn = document.getElementById('btnSurprise');
    const closeBtn = document.getElementById('closeModal');

    btn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    modal.addEventListener('wheel', function(e) {
        const content = this.querySelector('.modal-content');
        const isAtTop = content.scrollTop === 0;
        const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    });

    // Control de audio
const audioControl = document.getElementById('audioControl');
const backgroundMusic = document.getElementById('backgroundMusic');

audioControl.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        audioControl.classList.remove('muted');
    } else {
        backgroundMusic.pause();
        audioControl.classList.add('muted');
    }
});

// Opcional: Mostrar el control como muted inicialmente
audioControl.classList.add('muted');

// Modifica tu función startMusic para que también actualice el icono
function startMusic() {
    document.body.addEventListener('click', function musicStarter() {
        backgroundMusic.play()
            .then(() => {
                audioControl.classList.remove('muted');
            })
            .catch(e => console.log("No se pudo reproducir automáticamente:", e));
        document.body.removeEventListener('click', musicStarter);
    }, { once: true });
    
    backgroundMusic.play()
        .then(() => {
            audioControl.classList.remove('muted');
        })
        .catch(e => {
            console.log("Autoplay no permitido, esperando interacción del usuario");
            startMusic();
        });
}});