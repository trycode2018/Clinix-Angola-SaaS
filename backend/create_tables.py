# backend/create_tables.py
from app.database import engine, Base
from app import models  # importa todos os modelos

def main():
    print("Criando tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")

if __name__ == "__main__":
    main()