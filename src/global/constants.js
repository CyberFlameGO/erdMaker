export const serverHost =
  process.env.NODE_ENV === "production" ? process.env.REACT_APP_DO_HOST : process.env.REACT_APP_LOCALHOST;
export const diagramLimit = 10;
export const nameSize = 30; // For entities, relationships and attributes
export const fontSize = 13; // In the canvas stage
export const toolbarHeight = 60;
export const stageWidth = 2176;
export const stageHeight = 1224;
export const entityWidth = 110;
export const entityHeight = 45;
export const entityWeakOffset = 10;
export const relationshipWidth = 60;
export const relationshipHeight = 30;
export const attributeRadiusX = 50;
export const attributeRadiusY = 25;
export const multivaluedAttributeOffset = 4;
export const labelTextSize = 200;
export const labelMinWidth = 150;
export const labelMinHeight = 40;
export const labelMaxWidth = 400;
export const labelMaxHeight = 400;
export const attributeSpawnRadius = 150;
export const weakRelationshipOffset = 5;
export const anchorLength = 30;
export const savePeriod = 5000; // How often auto-saving is triggered in ms
export const resizeRectSize = 1000; // Rectangle used for resizing labels
export const timeout = 10000; // Requests timeout after this many milliseconds