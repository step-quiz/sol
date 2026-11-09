"""Els camins del repositori. Totes les eines els agafen d'aquí: no n'hi ha cap d'escrit a mà enlloc més."""
import os
EINES = os.path.dirname(os.path.abspath(__file__))
ARREL = os.path.dirname(EINES)                    # l'arrel del repositori
TEX = os.path.join(ARREL, 'tex')                  # els .tex de les errades (els hi puja el professor)
PDFS = os.path.join(ARREL, 'source')              # els PDF del solucionari, un per unitat
SORTIDA = os.path.join(EINES, 'sortida')          # tot el que escriuen les eines va aquí; no es puja a GitHub
os.makedirs(SORTIDA, exist_ok=True)
