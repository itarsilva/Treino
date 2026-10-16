#!/bin/sh
# Regera crm/leads.json a partir das exportações do RD. Passe a pasta dos CSVs.
U=${1:?pasta com os CSVs}
python3 -I crm/build_leads.py \
  "ABF 2026=$U/1dd85afa-rd-ledwave-conversoes-leadsabf2026.csv" \
  "APAS 2026=$U/80e8bfaa-rd-ledwave-conversoes-listapas20226-coletor.csv" \
  "Trade Connection 2025=$U/ba168ccc-rd-ledwave-conversoes-trade-connection-2025.csv" \
  "TradeCo 2026=$U/c1e90413-rd-ledwave-conversoes-tradeco-report-leads_rd.csv" \
  "7º Fórum RJ=$U/e1bba264-rd-ledwave-conversoes-copia-de-lista-varejistas-presentes-7-forum-rio-de-janeiro-varejistas-presentes.csv"
