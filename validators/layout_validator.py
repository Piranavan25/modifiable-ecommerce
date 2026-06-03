class LayoutValidator:
    def __init__(self, metadata: dict):
        self.metadata = metadata

    def validate(self, generated_layout: dict) -> bool:
        """
        Recursively checks structural node elements, components, props, and design constraints.
        Returns True if safe, False if corrupted.
        """
        if not isinstance(generated_layout, dict):
            print("❌ Validation Error: Layout root is not a valid JSON object dictionary.")
            return False
        
        return self._validate_node(generated_layout)

    def _validate_node(self, node: dict) -> bool:
        if not isinstance(node, dict):
            return False

        # Case A: Handling Layout Structural Container Elements ("row" / "column")
        if "type" in node and "component" not in node:
            if "children" not in node or not isinstance(node["children"], list):
                print(f"❌ Validation Error: Container structural node '{node.get('type')}' is missing a valid children array.")
                return False
            
            for child in node["children"]:
                if not self._validate_node(child):
                    return False
            return True

        # Case B: Handling Interface Component Blocks
        elif "component" in node:
            component_name = node["component"]
            
            if component_name not in self.metadata:
                print(f"❌ Validation Error: AI generated an unregistered component name string: '{component_name}'. Please ensure it exists in componentsMetadata.json.")
                return False
                
            component_rules = self.metadata[component_name]
            props = node.get("props", {})
            
            # Intercept style objects whether they sit under root or nested inside props
            styles = node.get("styles", {})
            if not styles and isinstance(props, dict) and "styles" in props:
                styles = props["styles"]

            # Validate component properties changes
            if isinstance(props, dict):
                for prop_key, prop_val in props.items():
                    if prop_key in ["styles", "className", "width"]:
                        continue
                    if prop_key not in component_rules.get("editableProps", []):
                        print(f"⚠️ Validation Warning: Prop '{prop_key}' is not editable on component '{component_name}'.")
                        return False
                    
                    allowed_choices = component_rules.get("allowedValues", {}).get(prop_key)
                    if allowed_choices is not None and prop_val not in allowed_choices:
                        print(f"❌ Validation Error: '{prop_val}' is an illegal value for prop '{prop_key}' on '{component_name}'.")
                        return False

            # Validate Tailwind CSS style configurations mutation lists
            if isinstance(styles, dict):
                for style_key in styles.keys():
                    if style_key not in component_rules.get("editableStyles", []):
                        print(f"❌ Validation Error: Styling parameter key '{style_key}' cannot be updated on '{component_name}'. Check your componentsMetadata.json styles array.")
                        return False

            return True

        print(f"❌ Validation Error: Node element contains neither a recognizable layout container type nor a component key. Node contents: {node}")
        return False