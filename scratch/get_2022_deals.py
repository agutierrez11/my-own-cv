import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
df = pd.read_excel(excel_path, sheet_name='Data Nodes - Current Organizati')

# Filter for Antonio Gutierrez
mask = df['Sales Rep'].astype(str).str.contains('antonio guti', case=False, na=False)
antonio_df = df[mask].copy()

# Determine the year of the deal
antonio_df['Win date_dt'] = pd.to_datetime(antonio_df['Win date'], errors='coerce')
antonio_df['Created Date_dt'] = pd.to_datetime(antonio_df['Created Date'], errors='coerce')
antonio_df['Year'] = antonio_df['Win date_dt'].dt.year.fillna(antonio_df['Created Date_dt'].dt.year)

# Filter for 2022 deals
df_2022 = antonio_df[antonio_df['Year'] == 2022].copy()

# Sort by Win date
df_2022 = df_2022.sort_values('Win date')

print(f"=== LISTA DE LOS {len(df_2022)} COMERCIOS GANADOS EN 2022 ===")
print("==================================================")

for idx, row in df_2022.iterrows():
    name = row['Nodo Name']
    win_date = row['Win date']
    if pd.notna(win_date):
        if hasattr(win_date, 'strftime'):
            win_date_str = win_date.strftime('%Y-%m-%d')
        else:
            win_date_str = str(win_date)
    else:
        win_date_str = str(row['Created Date'])
        
    source = row['Lead Source']
    signed = row['Monthly TPV Signed']
    ytd = row['TPV YTD']
    
    # Safe printing (no emoji)
    print(f"Comercio: {str(name).upper()}")
    print(f"  - Fecha de cierre: {win_date_str}")
    print(f"  - Canal de origen: {str(source)}")
    print(f"  - TPV Mensual Firmado: ${float(signed):,.2f} MXN")
    print(f"  - TPV Real Transaccionado (YTD): ${float(ytd):,.2f} MXN")
    print("-" * 30)
