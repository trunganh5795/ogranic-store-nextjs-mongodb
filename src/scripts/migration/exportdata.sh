#!/bin/bash
script_path=$(dirname "$(readlink -f "$0")")
mongoexport --db=testdb --collection=products --out="$script_path/data/products.json"
mongoexport --db=testdb --collection=users --out="$script_path/data/users.json"
mongoexport --db=testdb --collection=orders --out="$script_path/data/orders.json"
mongoexport --db=testdb --collection=posts --out="$script_path/data/posts.json"
