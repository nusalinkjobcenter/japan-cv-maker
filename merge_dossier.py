#!/usr/bin/env python3
"""
CLI & Automated Helper to merge Candidate 履歴書 PDF with JFT and SSW Certificates.
Uses the system pypdf library.
Usage:
  python3 merge_dossier.py --cv CV.pdf --jft jft.pdf --ssw ssw.pdf --out Final_Dossier.pdf
"""
import os
import sys
import argparse

try:
    from pypdf import PdfWriter, PdfReader
except ImportError:
    print("pypdf is required. Run: pip install pypdf")
    sys.exit(1)

def merge_dossier(cv_path, jft_path=None, ssw_path=None, out_path="Consolidated_Dossier.pdf"):
    writer = PdfWriter()

    # 1. Add 履歴書 (Rirekisho)
    if os.path.exists(cv_path):
        reader_cv = PdfReader(cv_path)
        for i, page in enumerate(reader_cv.pages):
            writer.add_page(page)
            if i == 0:
                writer.add_outline_item("1. 日本語履歴書 (基本情報・学歴・職歴)", 0)
        print(f"Added {len(reader_cv.pages)} page(s) from 履歴書: {cv_path}")
    else:
        print(f"Error: CV file not found: {cv_path}")
        return False

    # 2. Add JFT PDF
    if jft_path and os.path.exists(jft_path):
        reader_jft = PdfReader(jft_path)
        start_idx = len(writer.pages)
        for page in reader_jft.pages:
            writer.add_page(page)
        writer.add_outline_item("2. 添付資料: JFT-Basic A2 日本語判定通知書原本", start_idx)
        print(f"Added {len(reader_jft.pages)} page(s) from JFT Certificate: {jft_path}")

    # 3. Add SSW PDF
    if ssw_path and os.path.exists(ssw_path):
        reader_ssw = PdfReader(ssw_path)
        start_idx = len(writer.pages)
        for page in reader_ssw.pages:
            writer.add_page(page)
        writer.add_outline_item("3. 添付資料: 特定技能1号評価試験 合格証明書原本", start_idx)
        print(f"Added {len(reader_ssw.pages)} page(s) from SSW Certificate: {ssw_path}")

    with open(out_path, "wb") as f_out:
        writer.write(f_out)

    print(f"SUCCESS: Consolidated Dossier created at: {out_path} (Total {len(writer.pages)} pages)")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Merge Rirekisho with JFT and SSW Certificates")
    parser.add_argument("--cv", required=True, help="Path to 履歴書 PDF")
    parser.add_argument("--jft", help="Path to JFT-Basic PDF")
    parser.add_argument("--ssw", help="Path to SSW Skills Certificate PDF")
    parser.add_argument("--out", default="Consolidated_Dossier.pdf", help="Output merged PDF path")
    args = parser.parse_args()

    merge_dossier(args.cv, args.jft, args.ssw, args.out)
