import pandas as pd
import numpy as np

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
df = pd.read_excel(excel_path, sheet_name='Data Nodes - Current Organizati')

# Filter for Antonio Gutierrez
mask = df['Sales Rep'].astype(str).str.contains('antonio guti', case=False, na=False)
antonio_df = df[mask].copy()

# Determine the year of the deal.
# Use 'Win date' first. If null, use 'Created Date'.
antonio_df['Win date_dt'] = pd.to_datetime(antonio_df['Win date'], errors='coerce')
antonio_df['Created Date_dt'] = pd.to_datetime(antonio_df['Created Date'], errors='coerce')
antonio_df['Year'] = antonio_df['Win date_dt'].dt.year.fillna(antonio_df['Created Date_dt'].dt.year)

# Standardize Lead Source
antonio_df['Lead Source'] = antonio_df['Lead Source'].fillna('Sin Clasificar')

# Fill NaN in numeric fields with 0
antonio_df['Monthly TPV Signed'] = pd.to_numeric(antonio_df['Monthly TPV Signed'], errors='coerce').fillna(0)
antonio_df['TPV YTD'] = pd.to_numeric(antonio_df['TPV YTD'], errors='coerce').fillna(0)

print("==================================================")
print("METRICAS DE PERFORMANCE POR AÑO (ANTONIO GUTIERREZ)")
print("==================================================")

# A. Deals by Year
deals_by_year = antonio_df.groupby('Year').size()
tpv_signed_by_year = antonio_df.groupby('Year')['Monthly TPV Signed'].sum()
tpv_ytd_by_year = antonio_df.groupby('Year')['TPV YTD'].sum()

print("\n--- RESUMEN ANUAL ---")
for yr in sorted(antonio_df['Year'].dropna().unique()):
    yr_int = int(yr)
    count = deals_by_year.get(yr, 0)
    signed = tpv_signed_by_year.get(yr, 0)
    ytd = tpv_ytd_by_year.get(yr, 0)
    print(f"\nAÑO {yr_int}:")
    print(f"  * Comercios Ganados: {count}")
    print(f"  * TPV Mensual Firmado: ${signed:,.2f} MXN")
    print(f"  * TPV Real Transaccionado (YTD): ${ytd:,.2f} MXN")

print("\n--- DESGLOSE POR CANAL Y AÑO ---")
for yr in sorted(antonio_df['Year'].dropna().unique()):
    yr_int = int(yr)
    yr_df = antonio_df[antonio_df['Year'] == yr]
    print(f"\n=================== AÑO {yr_int} ===================")
    
    # Group by Lead Source
    grp = yr_df.groupby('Lead Source').agg(
        deals=('Lead Source', 'count'),
        tpv_signed=('Monthly TPV Signed', 'sum'),
        tpv_ytd=('TPV YTD', 'sum')
    )
    # Percentages
    grp['deals_%'] = (grp['deals'] / grp['deals'].sum() * 100).round(1)
    grp['tpv_signed_%'] = (grp['tpv_signed'] / grp['tpv_signed'].sum() * 100).round(1)
    grp['tpv_ytd_%'] = (grp['tpv_ytd'] / grp['tpv_ytd'].sum() * 100).round(1)
    
    # Sort by deals desc
    grp = grp.sort_values('deals', ascending=False)
    
    print("\nA. Por Número de Comercios:")
    for idx, row in grp.iterrows():
        print(f"  - {idx}: {int(row['deals'])} comercios ({row['deals_%']}%)")
        
    print("\nB. Por TPV Mensual Firmado:")
    for idx, row in grp.iterrows():
        print(f"  - {idx}: ${row['tpv_signed']:,.2f} MXN ({row['tpv_signed_%']}%)")
        
    print("\nC. Por Volumen Real Transaccionado (TPV YTD):")
    for idx, row in grp.iterrows():
        print(f"  - {idx}: ${row['tpv_ytd']:,.2f} MXN ({row['tpv_ytd_%']}%)")
