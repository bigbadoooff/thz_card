// Shared utility functions for THZ Card
// This module contains functions used by both the main card and the editor

/**
 * Find entities matching a pattern with THZ integration filtering
 * Used by both the main card and editor to ensure consistency
 * 
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {RegExp} pattern - Pattern to match against entity ID and friendly name
 * @param {string|null} domain - Optional domain filter (e.g., 'sensor', 'switch')
 * @returns {Array<string>} Array of matching entity IDs
 */
export function findEntitiesByPattern(hass, config, pattern, domain = null) {
  if (!hass) return [];
  
  // Get device entities if device_id is specified
  let deviceEntityIds = null;
  if (config.device_id && hass.devices && hass.entities) {
    deviceEntityIds = Object.entries(hass.entities)
      .filter(([entityId, entity]) => entity.device_id === config.device_id)
      .map(([entityId]) => entityId);
  }
  
  return Object.entries(hass.states)
    .filter(([entityId, entity]) => {
      // Check if entity has required attributes
      if (!entity || !entity.attributes) return false;
      
      // If device_id is specified, only show entities from that device
      if (deviceEntityIds && !deviceEntityIds.includes(entityId)) {
        return false;
      }
      
      // If entity_filter is specified, entity must contain the filter string
      if (config.entity_filter && !entityId.toLowerCase().includes(config.entity_filter.toLowerCase())) {
        return false;
      }
      
      // Check if it belongs to the thz integration or matches pattern
      // Check multiple ways an entity could be from THZ integration:
      // 1. Entity ID contains 'thz' (most common)
      // 2. Entity ID contains 'tecalor' (alternative branding)
      // 3. Entity ID contains 'lwz' (Stiebel Eltron LWZ series)
      // 4. Device name/via_device contains thz-related keywords
      // 5. If entity_filter or device_id is set, skip THZ check (user knows what they want)
      const skipTHZCheck = config.entity_filter || config.device_id;
      const matchesTHZ = skipTHZCheck || 
                        entityId.toLowerCase().includes('thz') || 
                        entityId.toLowerCase().includes('tecalor') ||
                        entityId.toLowerCase().includes('lwz') ||
                        entity.attributes.integration === 'thz' ||
                        (entity.attributes.device_class && 
                         JSON.stringify(entity.attributes).toLowerCase().includes('thz'));
      
      if (!matchesTHZ) return false;
      
      // Check domain if specified
      if (domain && !entityId.startsWith(domain + '.')) return false;
      
      // Check pattern - now also check the entity name part after the domain
      const entityName = entityId.includes('.') ? entityId.split('.')[1] : entityId;
      const friendlyName = entity.attributes.friendly_name || '';
      
      // Test against entity ID, entity name (without domain), and friendly name
      return pattern.test(entityId) || 
             pattern.test(entityName) || 
             pattern.test(friendlyName);
    })
    .map(([entityId]) => entityId);
}
