"""Prepare the database before Gunicorn starts accepting requests."""
import subprocess
import sys
from pathlib import Path


def on_starting(server):
    server.log.info("Applying database migrations before starting workers")
    subprocess.run(
        [sys.executable, "manage.py", "migrate", "--no-input"],
        cwd=Path(__file__).resolve().parent,
        check=True,
    )
