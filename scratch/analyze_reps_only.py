import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
df = pd.read_excel(excel_path, sheet_name='Jun Exec')
df.columns = [c.strip() if isinstance(c, str) else c for c in df.columns]

# Get unique managers in the dataset to filter them out of the Sales Rep list
managers = df['Sales Manager'].dropna().unique().tolist()
# Add other known managers
managers.extend(['Emilio Obeso', 'Fernando Espinosa', 'Francisco Ramos', 'Fuad Saleme', 'Joel Garcia', 'Karla Reyes', 'Ricardo Ugalde', 'Mariana Hernández', 'Mariana Hernndez'])
managers = list(set(managers))

# Filter to get INDIVIDUAL Sales Reps
df_reps = df[
    (~df['Sales Rep'].isin(['Overall', 'Middle Market', 'Large Market', 'Hunters Digitales'])) &
    (~df['Sales Rep'].isin(managers)) &
    (~df['Sales Rep'].str.contains('Team', case=False, na=False))
].copy()

# TPV and Deals Columns
tpv_cols = ['TPV - January 2022', 'TPV - February 2022', 'TPV - March 2022', 'TPV - April 2022', 'TPV - May 2022', 'TPV - June 2022']
deals_cols = ['Won Deals - January 2022', 'Won Deals - February 2022', 'Won Deals - March 2022', 'Won Deals - April 2022', 'Won Deals - May 2022', 'Won Deals - June 2022']

df_reps[tpv_cols] = df_reps[tpv_cols].fillna(0)
df_reps[deals_cols] = df_reps[deals_cols].fillna(0)

# Total columns
df_reps['Total_TPV_H1_2022'] = df_reps[tpv_cols].sum(axis=1)
df_reps['Total_Deals_H1_2022'] = df_reps[deals_cols].sum(axis=1)

# Sort by Total TPV
reps_sorted = df_reps.sort_values('Total_TPV_H1_2022', ascending=False).reset_index(drop=True)

print("==================================================")
print("RANKING GENERAL DE EJECUTIVOS INDIVIDUALES (H1 2022)")
print("==================================================")
print(f"Total de ejecutivos individuales analizados: {len(reps_sorted)}")

# Top 15 Individual Reps by TPV
cols_to_print = ['Sales Rep', 'Sales Manager', 'Sales Jr Manager', 'Total_Deals_H1_2022', 'Total_TPV_H1_2022']
print("\n--- TOP 15 EJECUTIVOS POR TPV TOTAL REAL (H1 2022) ---")
for idx, row in reps_sorted.head(15).iterrows():
    print(f"#{idx+1}: {row['Sales Rep']} (Manager: {row['Sales Manager']})")
    print(f"    - Deals Ganados: {int(row['Total_Deals_H1_2022'])}")
    print(f"    - TPV Total H1 2022: ${row['Total_TPV_H1_2022']:,.2f} MXN")

# Find Antonio Gutierrez rank
antonio_rows = reps_sorted[reps_sorted['Sales Rep'].str.contains('antonio guti', case=False, na=False)]
if not antonio_rows.empty:
    antonio_idx = antonio_rows.index[0]
    antonio_rank = antonio_idx + 1
    antonio_data = reps_sorted.loc[antonio_idx]
    print(f"\n==================================================")
    print(f"POSICION DE ANTONIO GUTIERREZ:")
    print(f"==================================================")
    print(f"Ranking General: #{antonio_rank} de {len(reps_sorted)} ejecutivos individuales.")
    print(f"  - Deals Ganados H1: {int(antonio_data['Total_Deals_H1_2022'])}")
    print(f"  - TPV Total H1: ${antonio_data['Total_TPV_H1_2022']:,.2f} MXN")
    
    print("\n--- Evolucion Mensual de Antonio (TPV 2022) ---")
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
    for m, col in zip(months, tpv_cols):
        val = antonio_data[col]
        deals_col = col.replace('TPV -', 'Won Deals -')
        d_val = antonio_data[deals_col]
        print(f"  * {m}: {int(d_val)} deals | TPV: ${val:,.2f} MXN")
else:
    print("\nAntonio Gutiérrez no fue encontrado en los ejecutivos individuales.")

# Let's show Month-over-Month TOP reps
print("\n==================================================")
print("RANKING MENSUAL (GANADORES DE CADA MES)")
print("==================================================")
months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
for m, tpv_col in zip(months, tpv_cols):
    monthly_sorted = df_reps.sort_values(tpv_col, ascending=False).reset_index(drop=True)
    winner = monthly_sorted.iloc[0]
    print(f"** {m.upper()} 2022:")
    print(f"   - 1er Lugar: {winner['Sales Rep']} | TPV: ${winner[tpv_col]:,.2f} MXN")
    print(f"   - 2do Lugar: {monthly_sorted.iloc[1]['Sales Rep']} | TPV: ${monthly_sorted.iloc[1][tpv_col]:,.2f} MXN")
    print(f"   - 3er Lugar: {monthly_sorted.iloc[2]['Sales Rep']} | TPV: ${monthly_sorted.iloc[2][tpv_col]:,.2f} MXN")
    
    # Where was Antonio this month?
    antonio_m_idx = monthly_sorted[monthly_sorted['Sales Rep'].str.contains('antonio guti', case=False, na=False)].index
    if len(antonio_m_idx) > 0:
        a_m_rank = antonio_m_idx[0] + 1
        a_m_val = monthly_sorted.loc[antonio_m_idx[0], tpv_col]
        a_m_deals = monthly_sorted.loc[antonio_m_idx[0], tpv_col.replace('TPV -', 'Won Deals -')]
        print(f"   -> Antonio Gutierrez: #{a_m_rank} ({int(a_m_deals)} deals, ${a_m_val:,.2f} MXN)")
    print("-" * 40)
