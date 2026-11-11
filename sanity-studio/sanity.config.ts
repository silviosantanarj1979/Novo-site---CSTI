import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { blogPost } from "./schemaTypes/blogPost";

export default defineConfig({
  name: "default",
  title: "CSTI Brasil | Blog",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: [blogPost] },
});
