document.addEventListener('DOMContentLoaded', () => {
    const tagStorage = {};
    const personalTagStorage = {};
    let timeoutId = null;
    let timerStarted = false;

    function handleHighlight(event) {
        const selection = window.getSelection();
        if (selection.toString().trim() === '') return;

        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.parentElement;
        const tagElement = parentElement.closest('.in-content');

        if (!tagElement) return;

        const tag = tagElement.getAttribute('data-tag');
        const personalTag = tagElement.getAttribute('personal-tag');

        if (!tag) return;

        if (!tagStorage[tag]) {
            tagStorage[tag] = [];
        }
        tagStorage[tag].push(selection.toString());

        if (!personalTagStorage[personalTag]) {
            personalTagStorage[personalTag] = [];
        }
        personalTagStorage[personalTag].push(selection.toString());

        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
    }

    function addIDToTagStorage(id, value) {
        if (!Array.isArray(tagStorage[id])) {
            tagStorage[id] = [];
        }

        tagStorage[id].push(value);
    }

    function handleTags(tagStorage, personalTagStorage) {
        console.log('Tag Storage:', tagStorage);
        console.log('Personal Tag Storage:', personalTagStorage);
        localStorage.setItem('personalTagStorage', JSON.stringify(personalTagStorage));
    }

    function startTimer() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            addIDToTagStorage("id", "0x9999999999");
            handleTags(tagStorage, personalTagStorage);
            for (const key in tagStorage) {
                if (Object.hasOwnProperty.call(tagStorage, key)) {
                    tagStorage[key] = [];
                }
            }
            timerStarted = false;
        }, 3000); // 30 seconds
    }



    document.addEventListener('mouseup', handleHighlight);
});
