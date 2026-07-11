import pandas as pd
import numpy as np

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
xl = pd.ExcelFile(excel_path)

# 1. Read Data Nodes to build Sales Rep -> Segment mapping
df_nodes = pd.read_excel(xl, sheet_name='Data Nodes - Current Organizati')
df_nodes.columns = [c.strip() if isinstance(c, str) else c for c in df_nodes.columns]

# Get the most common segment for each sales rep
rep_segment_map = df_nodes.groupby('Sales Rep')['ME Segment'].agg(lambda x: x.mode()[0] if not x.mode().empty else 'Unknown').to_dict()

# 2. Read H1 2022 Monthly Performance
df_jun = pd.read_excel(xl, sheet_name='Jun Exec')
df_jun.columns = [c.strip() if isinstance(c, str) else c for c in df_jun.columns]

# Filter individual reps
managers = ['Emilio Obeso', 'Fernando Espinosa', 'Francisco Ramos', 'Fuad Saleme', 'Joel Garcia', 'Karla Reyes', 'Ricardo Ugalde', 'Mariana Hernández', 'Mariana Hernndez']
df_reps = df_jun[
    (~df_jun['Sales Rep'].isin(['Overall', 'Middle Market', 'Large Market', 'Hunters Digitales'])) &
    (~df_jun['Sales Rep'].isin(managers)) &
    (~df_jun['Sales Rep'].str.contains('Team', case=False, na=False))
].copy()

# Add mapped segment
df_reps['Segment'] = df_reps['Sales Rep'].map(rep_segment_map).fillna('Unknown')

# Standardize TPV and Deals Columns
tpv_cols = ['TPV - January 2022', 'TPV - February 2022', 'TPV - March 2022', 'TPV - April 2022', 'TPV - May 2022', 'TPV - June 2022']
deals_cols = ['Won Deals - January 2022', 'Won Deals - February 2022', 'Won Deals - March 2022', 'Won Deals - April 2022', 'Won Deals - May 2022', 'Won Deals - June 2022']

df_reps[tpv_cols] = df_reps[tpv_cols].fillna(0)
df_reps[deals_cols] = df_reps[deals_cols].fillna(0)

# Totals
df_reps['Total_TPV_H1_2022'] = df_reps[tpv_cols].sum(axis=1)
df_reps['Total_Deals_H1_2022'] = df_reps[deals_cols].sum(axis=1)

print("=== DISTRIBUCION DE EJECUTIVOS POR SEGMENTO ===")
print(df_reps['Segment'].value_counts())

# Filter for Middle Market (and any rep matching MM or SMB since they represent similar tiers, but let's look at Middle Market specifically)
df_mm = df_reps[df_reps['Segment'] == 'Middle Market'].copy()
df_mm_sorted = df_mm.sort_values('Total_TPV_H1_2022', ascending=False).reset_index(drop=True)

print("\n==================================================")
print("RANKING EN SEGMENTO MIDDLE MARKET (H1 2022)")
print("==================================================")
print(f"Total de ejecutivos en Middle Market: {len(df_mm_sorted)}")

print("\n--- TOP 10 EJECUTIVOS EN MIDDLE MARKET ---")
for idx, row in df_mm_sorted.head(10).iterrows():
    print(f"#{idx+1}: {row['Sales Rep']} (Manager: {row['Sales Manager']})")
    print(f"    - Deals Ganados: {int(row['Total_Deals_H1_2022'])}")
    print(f"    - TPV Total H1: ${row['Total_TPV_H1_2022']:,.2f} MXN")

# Find Antonio Gutierrez
antonio_rows = df_mm_sorted[df_mm_sorted['Sales Rep'].str.contains('antonio guti', case=False, na=False)]
if not antonio_rows.empty:
    antonio_idx = antonio_rows.index[0]
    antonio_rank = antonio_idx + 1
    antonio_data = df_mm_sorted.loc[antonio_idx]
    print(f"\n==================================================")
    print(f"POSICION DE ANTONIO GUTIERREZ EN MIDDLE MARKET:")
    print(f"==================================================")
    print(f"Ranking en Middle Market: #{antonio_rank} de {len(df_mm_sorted)} ejecutivos.")
    print(f"Percentil en su segmento: Top {(antonio_rank / len(df_mm_sorted) * 100):.1f}%")
    print(f"  - Deals Ganados H1: {int(antonio_data['Total_Deals_H1_2022'])}")
    print(f"  - TPV Total H1: ${antonio_data['Total_TPV_H1_2022']:,.2f} MXN")
else:
    print("\nAntonio Gutiérrez no fue encontrado en Middle Market.")
