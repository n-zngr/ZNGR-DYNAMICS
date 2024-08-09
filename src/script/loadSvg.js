export function loadSvgFiles(callback) {
    const svgFiles = ['IconListDot.svg', 'IconCross.svg', 'IconListArrow.svg', 'IconPlus.svg', 'IconRight.svg'];
    const svgElements = {};

    function loadSvg(file, callback) {
        fetch(`/src/svg/${file}`)
        .then(response => response.text())
        .then(svgContent => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            svgElement.setAttribute('width', '10');
            svgElement.setAttribute('height', '10');
            svgElement.querySelectorAll('path').forEach(path => {
                path.removeAttribute('fill');
            });

            callback(file, svgElement);
        });
    }

    function loadAllSvgs(index, callback) {
        if (index < svgFiles.length) {
            loadSvg(svgFiles[index], (file, svgElement) => {
                svgElements[file] = svgElement;
                loadAllSvgs(index + 1, callback);
            });
        } else {
            callback(svgElements);
        }
    }

    loadAllSvgs(0, callback);
}