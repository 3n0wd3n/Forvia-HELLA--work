
for %%a in (*) do (
	echo .icon-%%~na ^{@include icon;-webkit-mask-image: url^('icons/%%~nxa'^);mask-image: url^('icons/%%~nxa'^);^} >>Info.txt
)