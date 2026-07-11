import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
xl = pd.ExcelFile(excel_path)

print("Searching for 'Antonio' or 'Gutiérrez' in all sheets...")

for name in xl.sheet_names:
    try:
        df = pd.read_excel(excel_path, sheet_name=name)
        # Search all columns for matches
        mask = df.astype(str).apply(lambda x: x.str.contains('antonio|gutiérrez|gutierrez', case=False, na=False)).any(axis=1)
        matches = df[mask]
        if not matches.empty:
            print(f"\n========================================")
            print(f"MATCH FOUND IN SHEET: {name}")
            print(f"========================================")
            # Print columns and matching rows
            for idx, row in matches.iterrows():
                print(f"Row {idx}:")
                for col in df.columns:
                    val = row[col]
                    if pd.notna(val) and val != "":
                        print(f"  {col}: {val}")
    except Exception as e:
        print(f"Error reading sheet {name}: {e}")
