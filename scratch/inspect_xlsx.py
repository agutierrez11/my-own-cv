import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"

xl = pd.ExcelFile(excel_path)
print("Sheet names:", xl.sheet_names)

for sheet in xl.sheet_names:
    df = pd.read_excel(excel_path, sheet_name=sheet, nrows=5)
    print(f"\n--- Sheet: {sheet} ---")
    print(df.columns.tolist())
    print(df.head(2))
