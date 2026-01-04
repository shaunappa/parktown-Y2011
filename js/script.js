// Load areas from data file
document.addEventListener('DOMContentLoaded', function() {
    loadAreas();
});

function loadAreas() {
    const areas = window.areasData || [];
    const container = document.getElementById('areasContainer');
    
    if (areas.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">No restoration areas found.</p>';
        return;
    }
    
    container.innerHTML = areas.map(area => `
        <a href="areas/${area.id}/" class="area-card">
            <div class="area-card-content">
                <h3 class="area-card-title">${escapeHtml(area.name)}</h3>
                <p class="area-card-description">${escapeHtml(area.description)}</p>
            </div>
        </a>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

