const { Controller } = WebCardinal.controllers;

export default class CheatsheetController extends Controller {
    constructor(...props) {
        super(...props);

        this.model = { sort: 'library' };

        this.fetchCheatsheet();
    }

    async fetchCheatsheet() {
        try {
            const response = await fetch(new URL('/docs/cheatsheet.json', window.location).href)
            this.cheatsheet = await response.json();

            this.container = this.element.shadowRoot.querySelector('[data-tag=cheatsheet]');

            this.removeCheatsheet();
            this.presentCheatsheetByLibrary();
            this.element.hidden = false;

            this.onTagEvent('sort', 'change', (model, target) => {
                if (target.value !== this.model.sort) {
                    this.model.sort = target.value;
                    this.changeCheatsheet();
                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    presentCheatsheetInAlphabeticalOrder() {
        const cheatsheet = this.cheatsheet;
        const letters = {};

        for (const component of Object.keys(cheatsheet)) {
            if (cheatsheet[component].disableCheatsheet) {
                continue;
            }

            let index = 0;
            if (component.startsWith('webc-')) {
                index = 5;
            } else if (component.startsWith('psk-')) {
                index = 4;
            }

            let letter = component[index].toUpperCase();
            if (!letters[letter]) {
                letters[letter] = [];
            }
            letters[letter].push({
                tag: component,
                ...cheatsheet[component]
            });
        }

        for (const letter of Object.keys(letters).sort()) {
            const letterArticle = this.createElement('article');
            letterArticle.setAttribute('data-letter', letter);

            const letterElement = this.createElement('div', {
                className: 'letter',
                innerText: letter
            });
            const letterContainer = this.createElement('div', {
                className: 'components container'
            });

            letterContainer.append(letterElement);
            for (const component of letters[letter]) {
                letterContainer.append(this.createComponent(component));
            }

            letterArticle.append(letterElement, letterContainer)
            this.container.append(letterArticle);
            this.container.setAttribute('data-sort', 'alphabetically');
        }
    }

    presentCheatsheetByLibrary() {
        const cheatsheet = this.cheatsheet;
        const libraries = {};

        for (const component of Object.keys(cheatsheet)) {
            if (cheatsheet[component].disableCheatsheet) {
                continue;
            }

            const index = cheatsheet[component].source;

            if (!libraries[index]) {
                libraries[index] = [];
            }
            libraries[index].push({
                tag: component,
                ...cheatsheet[component]
            });
        }

        for (const library of Object.keys(libraries).sort().reverse()) {
            const libraryArticle = this.createElement('article');
            libraryArticle.setAttribute('data-library', library);

            const { href, library: name } = this.createHref(library);
            const libraryElement = this.createElement('webc-link', {
                className: `source ${name}`,
                innerText: name,
                href
            });
            const libraryContainer = this.createElement('div', {
                className: 'components container'
            });

            libraryContainer.append(libraryElement);
            for (const component of libraries[library]) {
                libraryContainer.append(this.createComponent(component, true));
            }

            libraryArticle.append(libraryElement, libraryContainer)
            this.container.append(libraryArticle);
            this.container.setAttribute('data-sort', 'library');
        }
    }

    createComponent({ tag, source }, disableSource = false) {
        const tagElement = this.createElement('webc-link', {
            className: 'tag',
            innerText: tag,
            tag,
        });

        let { href, library } = this.createHref(source);
        const sourceElement = this.createElement('webc-link', {
            className: `source ${library}`,
            innerText: library,
            href: href
        });

        const componentElement = this.createElement('div', {
            className: `component ${tag}`
        });

        componentElement.append(tagElement);
        if (!disableSource) {
            componentElement.append(sourceElement);
        }

        return componentElement;
    }

    createHref(source) {
        const library = source.substr(1).replace('/', '-');
        return {
            href: 'https://github.com/webcardinal/' + library,
            library,
        }
    }

    changeCheatsheet() {
        this.removeCheatsheet();

        switch (this.model.sort) {
            case 'library': {
                this.presentCheatsheetByLibrary();
                return;
            }
            case 'alphabetically':
            default: {
                this.presentCheatsheetInAlphabeticalOrder();
                return;
            }
        }
    }

    removeCheatsheet() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}