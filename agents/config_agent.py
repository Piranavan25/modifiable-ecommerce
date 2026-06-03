import os
import json
from openai import OpenAI
import base64

class ConfigAgent:
    def __init__(self):
        # 1. Grab settings from your environment variables, providing default fallbacks for Groq
        self.api_key = os.getenv("GROQ_API_KEY", "your_gsk_actual_groq_key_here")
        self.base_url = os.getenv("LLM_BASE_URL", "http://localhost:11434/v1")#https://api.groq.com/openai/v1
        
        # Recommended high-quality models on Groq for rendering complex UI/JSON schemas
        self.model_name = os.getenv("LLM_MODEL", "gemma4:e2b") #"llama-3.3-70b-versatile"
        
        # 2. Point the client to Groq's engine
        self.client = OpenAI(api_key=self.api_key, base_url=self.base_url)

    def _load_system_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(__file__), "..", "prompts", "system_prompt.txt")
        try:
            with open(prompt_path, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            return "You are a UI layout configuration optimization agent. Return valid JSON layouts matching the metadata rules."

    def generate_redesign(self, current_layout: dict, metadata: dict, user_prompt: str, image_bytes: bytes = None) -> dict:
        system_instructions = self._load_system_prompt()

        text_content = f"""
        [CURRENT LAYOUT CONFIGURATION]
        {json.dumps(current_layout, indent=2)}

        [UI COMPONENT RULEBOOK AND CONTRACT]
        {json.dumps(metadata, indent=2)}

        [USER DESIGN REQUEST]
        "{user_prompt}"

        If a reference image is provided below, analyze its styling, background colors, and structure theme choices. Apply those visual choices to transform the current layout object seamlessly.

        Generate the completely transformed layout object following the constraints meticulously:
        """

        user_content_list = [
            {"type": "text", "text": text_content}
        ]
        
        if image_bytes:
            print(f"Local image asset found. Encoding and binding to {self.model_name} vision channel...")
            base64_image = base64.b64encode(image_bytes).decode('utf-8')
            
            user_content_list.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            })


        """  # Structure the payload data cleanly for Groq
        user_message_content = 
        [CURRENT LAYOUT CONFIGURATION]
        {json.dumps(current_layout, indent=2)}

        [UI COMPONENT RULEBOOK AND CONTRACT]
        {json.dumps(metadata, indent=2)}

        [USER DESIGN REQUEST]
        "{user_prompt}"

        Generate the completely transformed layout object following the constraints meticulously:
        
        """
        try:
            # 3. Call Groq using the native openAI interface wrapper
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": system_instructions},
                    {"role": "user", "content": user_content_list}
                ],
                temperature=0.2, # Kept low so Groq does not make up non-existent styling classes
                response_format={"type": "json_object"} # Groq supports JSON mode perfectly!
            )
            
            raw_content = response.choices[0].message.content.strip()
            return json.loads(raw_content)
            
        except Exception as e:
            print(f"Error inside ConfigAgent runtime during Groq invocation: {e}")
            # Fallback to the current layout safety state if Groq is hitting rate limits
            return current_layout