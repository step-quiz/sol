"""Els camins del repositori. Les eines dels pegats els agafen d'aquí."""
import os
EINES = os.path.dirname(os.path.abspath(__file__))
ARREL = os.path.dirname(EINES)                    # l'arrel del repositori
PDFS = os.path.join(ARREL, 'source')              # el PDF del solucionari
SORTIDA = os.path.join(EINES, 'sortida')          # tot el que escriuen les eines va aquí; no es puja a GitHub
os.makedirs(SORTIDA, exist_ok=True)
