// Image Modal Functionality
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Load images for an area from before/ and workdone/ folders
// Images are now in: areas/areaName/before/ and areas/areaName/workdone/
// HTML is in: areas/areaName/index.html
// So image paths from HTML are: before/image.jpg and workdone/image.jpg (same folder level)
function loadAreaImages(areaName) {
    const beforeGallery = document.getElementById('beforeGallery');
    const afterGallery = document.getElementById('afterGallery');
    
    // Image paths are relative to the HTML file location
    // Since HTML is in areas/areaName/index.html and images are in areas/areaName/before/
    // Path from HTML is: before/image.jpg (same folder level)
    const beforePath = 'before/';
    const afterPath = 'workdone/';
    
    // Get image data for this area
    const areaImages = window.imagesData && window.imagesData[areaName];
    
    // Load before images
    if (beforeGallery) {
        if (areaImages && areaImages.before && areaImages.before.length > 0) {
            beforeGallery.innerHTML = areaImages.before.map(imageName => {
                const imagePath = beforePath + encodeURIComponent(imageName);
                const escapedPath = imagePath.replace(/'/g, "\\'");
                return `<div class="gallery-item">
                    <img src="${imagePath}" alt="Before restoration" onclick="openModal('${escapedPath}')">
                </div>`;
            }).join('');
        } else {
            beforeGallery.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">No before restoration images available</p>';
        }
    }
    
    // Load workdone images
    if (afterGallery) {
        if (areaImages && areaImages.workdone && areaImages.workdone.length > 0) {
            afterGallery.innerHTML = areaImages.workdone.map(imageName => {
                const imagePath = afterPath + encodeURIComponent(imageName);
                const escapedPath = imagePath.replace(/'/g, "\\'");
                return `<div class="gallery-item">
                    <img src="${imagePath}" alt="After restoration" onclick="openModal('${escapedPath}')">
                </div>`;
            }).join('');
        } else {
            afterGallery.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">No after restoration images available</p>';
        }
    }
}

// Setup event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

