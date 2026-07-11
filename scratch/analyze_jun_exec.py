import pandas as pd

excel_path = "c:/Users/Antonio/OneDrive/Escritorio/fintech-portfolio-optimized/Datos_Adquisicion_21-22_TOTAL.xlsx"
df = pd.read_excel(excel_path, sheet_name='Jun Exec')

# Standardize columns
df.columns = [c.strip() if isinstance(c, str) else c for c in df.columns]

# Print first 20 rows to understand the structure
print("First 20 rows of 'Jun Exec':")
print(df.head(20)[['Sales Rep', 'Sales Manager', 'Sales Jr Manager', 'Won Deals - June 2022', 'TPV - June 2022']].to_string())

# Let's filter out general rows like 'Overall', 'Middle Market', etc.
df_filtered = df[~df['Sales Rep'].isin(['Overall', 'Middle Market', 'Large Market', 'Hunters Digitales'])].copy()

# Sum TPV across all 6 months to get a total ranking
tpv_cols = [c for c in df.columns if 'TPV -' in c]
print("\nMonthly TPV Columns:", tpv_cols)

df_filtered['Total_TPV_H1_2022'] = df_filtered[tpv_cols].sum(axis=1)
df_filtered['Total_Deals_H1_2022'] = df_filtered[[c for c in df.columns if 'Won Deals -' in c]].sum(axis=1)

# Sort by Total TPV
top_reps_tpv = df_filtered.sort_values('Total_TPV_H1_2022', ascending=False)

print("\n=== TOP 15 SALES REPS BY TOTAL TPV (H1 2022) ===")
cols_to_print = ['Sales Rep', 'Sales Manager', 'Sales Jr Manager', 'Total_Deals_H1_2022', 'Total_TPV_H1_2022']
print(top_reps_tpv[cols_to_print].head(15).to_string(index=False))

# Let's see where Antonio Gutierrez is in this ranking!
antonio_rank = top_reps_tpv[top_reps_tpv['Sales Rep'].str.contains('antonio guti', case=False, na=False)]
if not antonio_rank.empty:
    idx = antonio_rank.index[0]
    rank_pos = top_reps_tpv.index.get_loc(idx) + 1
    print(f"\nAntonio Gutiérrez rank in H1 2022: #{rank_pos} out of {len(top_reps_tpv)} reps")
    print(antonio_rank[cols_to_print].to_string(index=False))
else:
    print("\nAntonio Gutiérrez not found in Jun Exec sheet.")
