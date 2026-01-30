module github.com/spotwatchllc/parking-dash/services/ingest

go 1.25.1

replace github.com/spotwatchllc/parking-dash/protos/parking => ../../protos

require (
	github.com/spotwatchllc/parking-dash/protos/parking v0.0.0
	google.golang.org/grpc v1.78.0
)

require (
	golang.org/x/net v0.47.0 // indirect
	golang.org/x/sys v0.38.0 // indirect
	golang.org/x/text v0.31.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20251029180050-ab9386a59fda // indirect
	google.golang.org/protobuf v1.36.11 // indirect
)
