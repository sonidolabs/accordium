function findFirstParent (element, target) {
    while (element.parentElement) {
        if (element.parentElement.hasAttribute(target)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }

    return null;
}

function removeFirstParent(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

function accordion () {
    const accordions = Array.from(document.querySelectorAll('[data-accordion]'));

    const parents = [];

    accordions.forEach((accordion, index) => {
        const header = accordion.querySelector('[data-accordion-header]');
        const content = accordion.querySelector('[data-accordion-content]');

        content.style.overflow = 'hidden';
        content.style.maxHeight = '0px';

        header.addEventListener('click', () => {
            const isClose = content.style.maxHeight === '0px';
            content.setAttribute('id', `accordion-${index}`)
            const firstParent = findFirstParent(accordions[index], 'data-accordion-content');
            
            if (index > 0 && !parents.includes(firstParent)) {
                parents.push(firstParent);
                parents.sort((a, b) => {
                    const prev = parseInt(a.id.replace('accordion-', ''));
                    const next = parseInt(b.id.replace('accordion-', ''));

                    return prev - next;
                });
            }

            if (isClose) {
                if (index > 0) {
                    for (let j = index; j > 0; j--) {
                        const currentParent = parents.find(parent => parent === findFirstParent(accordions[j], 'data-accordion-content'));
     
                        if (currentParent) {
                            const currentHeight = content.scrollHeight;
                            const prevHeight = currentParent.scrollHeight;
                            const parentHeight = currentHeight + prevHeight;
                            currentParent.style.maxHeight = `${parentHeight}px`;
                        }
                    }
                }

                content.style.maxHeight = `${content.scrollHeight}px`;
                
            } else {
                removeFirstParent(parents, content);
                content.style.maxHeight = '0px';
            }
        })
    })
}

accordion () 