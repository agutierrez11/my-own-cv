import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
xl = pd.ExcelFile(excel_path)

df = pd.read_excel(xl, sheet_name='Data Nodes - Current Organizati')
print("Columns in 'Data Nodes - Current Organizati':")
print(df.columns.tolist())

# Filter for Antonio Gutierrez
mask = df.astype(str).apply(lambda x: x.str.contains('antonio guti', case=False, na=False)).any(axis=1)
antonio_df = df[mask]

print(f"\nFound {len(antonio_df)} rows for Antonio Gutiérrez.")
if not antonio_df.empty:
    print("\nFirst 3 rows:")
    print(antonio_df.head(3).to_string())
    
    # Let's see won_date, created_at, or any date column
    date_cols = [c for c in df.columns if 'date' in c.lower() or 'month' in c.lower() or 'created' in c.lower() or 'year' in c.lower()]
    print("\nDate values:")
    print(antonio_df[date_cols].head(10).to_string())
    
    # Check TPV columns
    tpv_cols = [c for c in df.columns if 'tpv' in c.lower() or 'monto' in c.lower() or 'volumen' in c.lower() or 'value' in c.lower()]
    print("\nTPV values:")
    print(antonio_df[tpv_cols].head(10).to_string())
