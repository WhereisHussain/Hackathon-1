import os
import glob
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

COLLECTION_NAME = "humanoid_robotics_textbook"

def create_collection():
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
    )

def get_embedding(text):
    text = text.replace("\n", " ")
    return openai_client.embeddings.create(input=[text], model="text-embedding-3-small").data[0].embedding

def ingest_docs(docs_path):
    files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)
    points = []
    for i, file_path in enumerate(files):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Basic chunking: one file as one chunk for now, or split by paragraph
            # For a textbook, paragraph-level or section-level is better.
            sections = content.split("##")
            for j, section in enumerate(sections):
                if not section.strip(): continue
                embedding = get_embedding(section)
                points.append(PointStruct(
                    id=i * 1000 + j,
                    vector=embedding,
                    payload={"content": section, "source": os.path.basename(file_path)}
                ))
    
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )
    print(f"Ingested {len(points)} sections from {len(files)} files.")

if __name__ == "__main__":
    # Example usage:
    # create_collection()
    # ingest_docs("../book/docs")
    pass
