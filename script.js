function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
  
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
  
    const taskbarTime = document.getElementById('taskbar-time');
    if (taskbarTime) {
      taskbarTime.innerHTML = `${hours}:${minutes} <span id="taskbar-date">${dateStr}</span>`;
    }
  }
  
  setInterval(updateClock, 1000);
  
  let isPowerOn = true;
  
  function initializePowerState() {
    const powerLight = document.querySelector('.power-light');
    const monitorDesktop = document.querySelector('.monitor-desktop');
    const startupScreen = document.querySelector('.startup-screen');
    
    if (powerLight) powerLight.style.backgroundColor = 'green';
    if (monitorDesktop) monitorDesktop.style.display = 'block';
    if (startupScreen) startupScreen.style.display = 'none';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    initializePowerState();
  });
  
  function setupStartMenu() {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.getElementById('start-menu');
    
    if (!startButton || !startMenu) return;
  
    startButton.addEventListener('click', () => {
      startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });
  
    document.addEventListener('click', (e) => {
      if (startMenu && !startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.style.display = 'none';
      }
    });
  }
  
  function setupWindowElements() {
    const appWindow = document.getElementById('app-window');
    const closeButton = document.querySelector('.close');
    const minimizeButton = document.querySelector('.minimize');
    const maximizeButton = document.querySelector('.maximize');
    const windowTitle = document.querySelector('.window-title');
  
    if (appWindow && closeButton && minimizeButton && maximizeButton && windowTitle) {
      window.appWindowElements = {
        appWindow,
        closeButton,
        minimizeButton,
        maximizeButton,
        windowTitle
      };
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupStartMenu();
    setupWindowElements();
  });
  
  const appData = {
    'my-computer': {
      title: 'System Properties',
      content: `
        <div style="padding: 10px;">
          <h3>System Properties</h3>
          <div style="margin-top: 20px; border: 1px solid #ccc; padding: 15px; border-radius: 5px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="48" height="48" style="margin-right: 15px;">
              <div>
                <h4 style="margin: 0;">Windows XP Professional</h4>
                <p style="margin: 5px 0 0 0;">Service Pack 2</p>
              </div>
            </div>
  
            <div style="margin-top: 20px;">
              <p><strong>Computer:</strong> Intel Pentium 4 - 2.8 GHz</p>
              <p><strong>Memory (RAM):</strong> 512 MB</p>
              <p><strong>System Type:</strong> 32-bit Operating System</p>
              <p><strong>Hard Drive:</strong> 80 GB</p>
              <p><strong>Graphics Card:</strong> NVIDIA GeForce 6800</p>
              <p><strong>Network:</strong> Integrated Ethernet 100 Mbps</p>
              <p><strong>Computer Name:</strong> WIN-XP-PC</p>
              <p><strong>Registered to:</strong> User</p>
            </div>
          </div>
  
          <div style="display: flex; flex-wrap: wrap; margin-top: 20px;">
            <div style="text-align: center; margin: 10px; width: 80px; cursor: pointer;" onclick="showDriveInfo('c')">
              <img src="https://win98icons.alexmeub.com/icons/png/drive_multimedia-2.png" width="48" height="48">
              <p>Local Disk (C:)</p>
            </div>
            <div style="text-align: center; margin: 10px; width: 80px; cursor: pointer;" onclick="showDriveInfo('d')">
              <img src="https://win98icons.alexmeub.com/icons/png/drive_cd_rom-0.png" width="48" height="48">
              <p>CD Drive (D:)</p>
            </div>
            <div style="text-align: center; margin: 10px; width: 80px; cursor: pointer;">
              <img src="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-0.png" width="48" height="48">
              <p>Network</p>
            </div>
          </div>
        </div>
      `
    },
    'internet-explorer': {
      title: 'Internet Explorer',
      content: `
        <div style="padding: 10px; height: 100%; display: flex; flex-direction: column;">
          <div style="background-color: #f0f0f0; padding: 5px; display: flex; align-items: center;">
            <span>Address: </span>
            <input type="text" id="ie-address-bar" value="https://www.msn.com" style="flex-grow: 1; margin: 0 5px;">
            <button onclick="navigateIE()">Go</button>
          </div>
          <div style="margin-top: 5px; flex-grow: 1; border: 1px solid #ccc; background: white;">
            <iframe id="ie-frame" src="https://www.msn.com" style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
        </div>
      `
    },
    'recycle-bin': {
      title: 'Recycle Bin',
      content: `
        <div style="padding: 10px;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-0.png" width="32" height="32" style="margin-right: 10px;">
            <h3 style="margin: 0;">Recycle Bin</h3>
          </div>
          <div style="border-bottom: 1px solid #ccc; margin: 10px 0;"></div>
          <div style="display: flex; justify-content: space-between; background-color: #f0f0f0; padding: 8px; margin-bottom: 10px;">
            <div>Name</div>
            <div>Original Location</div>
            <div>Date Deleted</div>
            <div>Size</div>
          </div>
          <p style="margin-top: 20px; color: #666; text-align: center;">The Recycle Bin is empty.</p>
          <div style="position: absolute; bottom: 10px; right: 10px;">
            <button onclick="emptyRecycleBin()" style="padding: 5px 10px;">Empty Recycle Bin</button>
          </div>
        </div>
      `
    },
    'cs16': {
      title: 'Counter-Strike 1.6',
      content: `
        <div style="padding: 10px; text-align: center;">
          <img src="https://win98icons.alexmeub.com/icons/png/joystick-0.png" width="200">
          <h3>Counter-Strike 1.6</h3>
          <div style="margin-top: 20px; text-align: left;">
            <p>Loading game...</p>
            <div style="background-color: #ddd; height: 20px; margin-top: 10px;">
              <div style="background-color: #4CAF50; height: 100%; width: 70%;"></div>
            </div>
            <p style="margin-top: 20px; font-style: italic; color: #666;">CS 1.6 cannot be loaded in this simulation.</p>
          </div>
        </div>
      `
    },
    'steam': {
      title: 'Steam',
      content: `
        <div style="padding: 0; height: 100%; display: flex; flex-direction: column;">
          <div style="background-color: #171a21; color: white; padding: 10px; display: flex; align-items: center;">
            <img src="https://win98icons.alexmeub.com/icons/png/cd_drive-5.png" width="30" style="margin-right: 10px;">
            <span style="font-weight: bold;">Steam</span>
          </div>
          <div style="flex-grow: 1; border: none;">
            <iframe src="https://store.steampowered.com/" style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
        </div>
      `
    },
    'winamp': {
      title: 'Winamp',
      content: `
        <div style="padding: 10px; background-color: #333; color: white; height: 100%;">
          <div style="display: flex; align-items: center; background-color: #222; padding: 5px;">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_multimedia-2.png" width="30">
            <h3 style="margin-left: 10px; font-size: 14px;">Winamp</h3>
          </div>
          <div style="margin-top: 10px; background-color: #222; padding: 10px;">
            <div id="winamp-playlist">
              <div class="winamp-track" onclick="playTrack(1)">01. Darude - Sandstorm.mp3</div>
              <div class="winamp-track" onclick="playTrack(2)">02. Eiffel 65 - Blue (Da Ba Dee).mp3</div>
              <div class="winamp-track" onclick="playTrack(3)">03. Bomfunk MC's - Freestyler.mp3</div>
              <div class="winamp-track" onclick="playTrack(4)">04. The Offspring - Pretty Fly.mp3</div>
              <div class="winamp-track" onclick="playTrack(5)">05. Britney Spears - Baby One More Time.mp3</div>
            </div>
          </div>
          <div style="margin-top: 10px; background-color: #222; padding: 10px;">
            <p id="winamp-now-playing">Now playing: No file loaded</p>
            <div style="display: flex; margin-top: 10px;">
              <button style="margin-right: 5px; background: #444; color: white; border: 1px solid #555;" onclick="prevTrack()">◀◀</button>
              <button style="margin-right: 5px; background: #444; color: white; border: 1px solid #555;" onclick="playWinamp()">▶</button>
              <button style="margin-right: 5px; background: #444; color: white; border: 1px solid #555;" onclick="pauseWinamp()">⏸</button>
              <button style="margin-right: 5px; background: #444; color: white; border: 1px solid #555;" onclick="stopWinamp()">■</button>
              <button style="background: #444; color: white; border: 1px solid #555;" onclick="nextTrack()">▶▶</button>
            </div>
            <div style="background-color: #555; height: 5px; margin-top: 10px;">
              <div id="winamp-progress" style="background-color: #007bff; height: 100%; width: 0;"></div>
            </div>
          </div>
        </div>
      `
    },
    'msn': {
      title: 'MSN Messenger',
      content: `
        <div style="padding: 10px; height: 100%; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; background-color: #f0f0f0; padding: 5px;">
            <img src="https://win98icons.alexmeub.com/icons/png/msn2-0.png" width="25">
            <h3 style="margin-left: 10px; font-size: 14px;">MSN Messenger</h3>
          </div>
          <div id="msn-login" style="margin-top: 20px; border: 1px solid #ccc; padding: 10px; flex-grow: 1;">
            <p><strong>Sign in</strong></p>
            <p style="margin-top: 10px;">E-mail address:</p>
            <input type="text" id="msn-email" style="width: 100%;">
            <p style="margin-top: 10px;">Password:</p>
            <input type="password" id="msn-password" style="width: 100%;">
            <div style="margin-top: 10px;">
              <input type="checkbox" id="msn-remember"> <label for="msn-remember">Remember me</label>
              <input type="checkbox" id="msn-auto-signin"> <label for="msn-auto-signin">Sign in automatically</label>
            </div>
            <button style="margin-top: 10px; padding: 5px 10px;" onclick="signInMSN()">Sign in</button>
          </div>
          <div id="msn-contacts" style="display: none; flex-grow: 1; border: 1px solid #ccc; margin-top: 10px;">
            <div style="background-color: #f0f0f0; padding: 5px;">
              <strong>Online (3)</strong>
            </div>
            <div class="msn-contact" onclick="openChat('friend1')">
              <div style="width: 10px; height: 10px; background-color: green; border-radius: 50%; margin-right: 5px;"></div>
              <span>Friend1@hotmail.com</span>
            </div>
            <div class="msn-contact" onclick="openChat('friend2')">
              <div style="width: 10px; height: 10px; background-color: green; border-radius: 50%; margin-right: 5px;"></div>
              <span>Friend2@hotmail.com</span>
            </div>
            <div class="msn-contact" onclick="openChat('friend3')">
              <div style="width: 10px; height: 10px; background-color: green; border-radius: 50%; margin-right: 5px;"></div>
              <span>Friend3@hotmail.com</span>
            </div>
            <div style="background-color: #f0f0f0; padding: 5px; margin-top: 10px;">
              <strong>Offline (2)</strong>
            </div>
            <div class="msn-contact">
              <div style="width: 10px; height: 10px; background-color: gray; border-radius: 50%; margin-right: 5px;"></div>
              <span>Friend4@hotmail.com</span>
            </div>
            <div class="msn-contact">
              <div style="width: 10px; height: 10px; background-color: gray; border-radius: 50%; margin-right: 5px;"></div>
              <span>Friend5@hotmail.com</span>
            </div>
          </div>
        </div>
      `
    },
    'notepad': {
      title: 'Notepad',
      content: `
        <div style="padding: 10px; height: 100%; display: flex; flex-direction: column;">
          <div style="background-color: #f0f0f0; padding: 5px; display: flex;">
            <div class="notepad-menu">File</div>
            <div class="notepad-menu">Edit</div>
            <div class="notepad-menu">Format</div>
            <div class="notepad-menu">View</div>
            <div class="notepad-menu">Help</div>
          </div>
          <textarea id="notepad-text" style="width: 100%; flex-grow: 1; resize: none; font-family: 'Lucida Console', monospace; padding: 5px; border: 1px solid #ccc; margin-top: 5px;">Welcome to Windows XP Simulator!
  
  This is a web-based simulation of the Windows XP experience.
  
  Feel free to explore the desktop icons and applications.
  
  Enjoy your nostalgic journey!</textarea>
          <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
            <button onclick="saveNotepad()">Save</button>
          </div>
        </div>
      `
    }
  };
  
  function setupDesktopIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const monitorDesktop = document.querySelector('.monitor-desktop');
    const contextMenu = document.getElementById('desktop-context-menu');
    
    if (!desktopIcons.length || !monitorDesktop || !contextMenu) return;
  
    desktopIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        desktopIcons.forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
  
        if (icon.dataset.lastClick && (new Date().getTime() - icon.dataset.lastClick < 400)) {
          openApp(icon.dataset.app);
        }
  
        icon.dataset.lastClick = new Date().getTime();
      });
    });
  
    monitorDesktop.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      const monitorScreen = document.querySelector('.monitor-screen');
      if (!monitorScreen) return;
      
      const rect = monitorScreen.getBoundingClientRect();
      contextMenu.style.left = (e.clientX - rect.left) + 'px';
      contextMenu.style.top = (e.clientY - rect.top) + 'px';
      contextMenu.style.display = 'block';
    });
  
    document.addEventListener('click', function() {
      contextMenu.style.display = 'none';
    });
  
    const contextMenuItems = document.querySelectorAll('.context-menu-item');
    contextMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        if (item.textContent === 'Refresh') {
          const icons = document.querySelector('.icons-container');
          if (icons) {
            icons.style.opacity = '0.5';
            setTimeout(() => {
              icons.style.opacity = '1';
            }, 300);
          }
        }
        contextMenu.style.display = 'none';
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupDesktopIcons();
  });
  
  function openApp(appName) {
    if (appData[appName]) {
      const appWindow = document.getElementById('app-window');
      const windowTitle = document.querySelector('.window-title');
      const windowContent = document.querySelector('.window-content');
      const startMenu = document.getElementById('start-menu');
      
      if (appWindow) appWindow.style.display = 'block';
      if (windowTitle) windowTitle.textContent = appData[appName].title;
      if (windowContent) windowContent.innerHTML = appData[appName].content;
      if (startMenu) startMenu.style.display = 'none';
  
      if (appName === 'winamp' && typeof initWinamp === 'function') {
        initWinamp();
      } else if (appName === 'internet-explorer') {
        initInternetExplorer();
      }
    }
  }
  
  function initInternetExplorer() {
    const addressBar = document.getElementById('ie-address-bar');
    if (addressBar) {
      addressBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          navigateIE();
        }
      });
    }
  }
  
  function navigateIE() {
    const addressBar = document.getElementById('ie-address-bar');
    const frame = document.getElementById('ie-frame');
    if (addressBar && frame) {
      let url = addressBar.value;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      frame.src = url;
    }
  }
  
  function showDriveInfo(drive) {
    let content = '';
    if (drive === 'c') {
      content = `
        <div style="padding: 10px;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <img src="https://win98icons.alexmeub.com/icons/png/drive_multimedia-2.png" width="32" height="32" style="margin-right: 10px;">
            <h3 style="margin: 0;">Local Disk (C:)</h3>
          </div>
          <div style="border-bottom: 1px solid #ccc; margin: 10px 0;"></div>
          <div style="margin-top: 20px;">
            <div style="background-color: #f5f5f5; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
              <h4>Drive Properties</h4>
              <p><strong>Type:</strong> Local Disk</p>
              <p><strong>File system:</strong> NTFS</p>
              <p><strong>Used space:</strong> 35.4 GB</p>
              <p><strong>Free space:</strong> 44.6 GB</p>
              <p><strong>Capacity:</strong> 80.0 GB</p>
              <div style="background-color: #ddd; height: 20px; border-radius: 10px; margin-top: 10px; overflow: hidden;">
                <div style="background-color: #4281f5; height: 100%; width: 44%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 12px;">
                <span>44% used (35.4 GB)</span>
                <span>56% free (44.6 GB)</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (drive === 'd') {
      content = `
        <div style="padding: 10px;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <img src="https://win98icons.alexmeub.com/icons/png/drive_cd_rom-0.png" width="32" height="32" style="margin-right: 10px;">
            <h3 style="margin: 0;">CD Drive (D:)</h3>
          </div>
          <div style="border-bottom: 1px solid #ccc; margin: 10px 0;"></div>
          <div style="margin-top: 20px; text-align: center;">
            <img src="https://win98icons.alexmeub.com/icons/png/cd_audio-5.png" width="64" height="64">
            <p style="margin-top: 15px;">No disc inserted.</p>
            <p style="margin-top: 5px; color: #666;">Please insert a disc to view its contents.</p>
          </div>
        </div>
      `;
    }
  
    const windowContent = document.querySelector('.window-content');
    if (windowContent) windowContent.innerHTML = content;
  }
  
  function emptyRecycleBin() {
    alert('Recycle Bin emptied successfully.');
  }
  
  let currentTrack = 0;
  let isPlaying = false;
  let winampTimer = null;
  let winampProgress = 0;
  
  function initWinamp() {
    currentTrack = 0;
    isPlaying = false;
    winampProgress = 0;
    if (winampTimer) clearInterval(winampTimer);
  
    const progressBar = document.getElementById('winamp-progress');
    if (progressBar) progressBar.style.width = '0%';
  
    const nowPlaying = document.getElementById('winamp-now-playing');
    if (nowPlaying) nowPlaying.textContent = 'Now playing: No file loaded';
  }
  
  function playTrack(trackNum) {
    currentTrack = trackNum;
    const tracks = document.querySelectorAll('.winamp-track');
    if (!tracks.length) return;
    
    tracks.forEach(track => track.classList.remove('playing'));
    
    if (tracks[trackNum - 1]) {
      tracks[trackNum - 1].classList.add('playing');
      const trackName = tracks[trackNum - 1].textContent;
      const nowPlaying = document.getElementById('winamp-now-playing');
      if (nowPlaying) nowPlaying.textContent = 'Now playing: ' + trackName;
    }
  
    playWinamp();
  }
  
  function playWinamp() {
    if (currentTrack === 0 && document.querySelectorAll('.winamp-track').length > 0) {
      playTrack(1);
      return;
    }
  
    isPlaying = true;
    if (winampTimer) clearInterval(winampTimer);
  
    winampTimer = setInterval(() => {
      winampProgress += 0.5;
      if (winampProgress >= 100) {
        nextTrack();
      } else {
        const progressElement = document.getElementById('winamp-progress');
        if (progressElement) progressElement.style.width = winampProgress + '%';
      }
    }, 500);
  }
  
  function pauseWinamp() {
    isPlaying = false;
    if (winampTimer) clearInterval(winampTimer);
  }
  
  function stopWinamp() {
    isPlaying = false;
    winampProgress = 0;
    const progressElement = document.getElementById('winamp-progress');
    if (progressElement) progressElement.style.width = '0%';
    if (winampTimer) clearInterval(winampTimer);
  }
  
  function nextTrack() {
    const tracks = document.querySelectorAll('.winamp-track');
    if (!tracks.length) return;
    
    if (currentTrack < tracks.length) {
      playTrack(currentTrack + 1);
    } else {
      playTrack(1);
    }
  }
  
  function prevTrack() {
    const tracks = document.querySelectorAll('.winamp-track');
    if (!tracks.length) return;
    
    if (currentTrack > 1) {
      playTrack(currentTrack - 1);
    } else {
      playTrack(tracks.length);
    }
  }
  
  function signInMSN() {
    const email = document.getElementById('msn-email');
    const password = document.getElementById('msn-password');
    const loginDiv = document.getElementById('msn-login');
    const contactsDiv = document.getElementById('msn-contacts');
  
    if (email && password && email.value && password.value) {
      if (loginDiv) loginDiv.style.display = 'none';
      if (contactsDiv) contactsDiv.style.display = 'block';
    } else {
      alert('Please enter your email and password.');
    }
  }
  
  function openChat(friend) {
    alert(`Chat with ${friend} would open here.`);
  }
  
  function saveNotepad() {
    alert('Your text has been saved.');
  }
  
  function setupWindowControls() {
    const closeButton = document.querySelector('.close');
    const minimizeButton = document.querySelector('.minimize');
    const appWindow = document.getElementById('app-window');
  
    if (closeButton && appWindow) {
      closeButton.addEventListener('click', () => {
        appWindow.style.display = 'none';
      });
    }
  
    if (minimizeButton && appWindow) {
      minimizeButton.addEventListener('click', () => {
        appWindow.style.display = 'none';
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupWindowControls();
  });
  
  function setupDraggableWindow() {
    let isDragging = false;
    let offsetX, offsetY;
    const windowHeader = document.querySelector('.window-header');
    const appWindow = document.getElementById('app-window');
  
    if (windowHeader && appWindow) {
      windowHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - appWindow.getBoundingClientRect().left;
        offsetY = e.clientY - appWindow.getBoundingClientRect().top;
      });
  
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          appWindow.style.left = (e.clientX - offsetX) + 'px';
          appWindow.style.top = (e.clientY - offsetY) + 'px';
          appWindow.style.transform = 'none';
        }
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }
  }
  
  function setupStartMenuItems() {
    const startItems = document.querySelectorAll('.start-item');
    const startMenu = document.getElementById('start-menu');
  
    if (!startItems.length) return;
  
    startItems.forEach(item => {
      item.addEventListener('click', () => {
        const spanElement = item.querySelector('span');
        if (!spanElement) return;
        
        const appName = spanElement.textContent.toLowerCase().replace(' ', '-');
        if (appName === 'shut-down') {
          document.body.innerHTML = '<div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #000; color: white; font-size: 24px;">It is now safe to turn off your computer.</div>';
        } else if (startMenu) {
          startMenu.style.display = 'none';
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupDraggableWindow();
    setupStartMenuItems();
  });