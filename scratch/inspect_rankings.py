import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
xl = pd.ExcelFile(excel_path)

print("Checking executive sheets...")

for sheet in ['Ranking  - Sales Reps', 'Rank - Sales Reps', 'Exec Info Historical', 'Jun Exec', 'Jul Exec']:
    if sheet in xl.sheet_names:
        print(f"\n========================================")
        print(f"SHEET: {sheet}")
        print(f"========================================")
        df = pd.read_excel(xl, sheet_name=sheet)
        print("Columns:", df.columns.tolist())
        print("Shape:", df.shape)
        print(df.head(5).to_string())
