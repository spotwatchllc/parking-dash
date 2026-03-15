package main

// minimal TTN webhook JSON shape
type TTNUplink struct {
	EndDeviceIDs struct {
		DeviceID string `json:"device_id"`
	} `json:"end_device_ids"`

	UplinkMessage struct {
		FRMPayload string `json:"frm_payload"`
	} `json:"uplink_message"`

	ReceivedAt string `json:"received_at"`
}