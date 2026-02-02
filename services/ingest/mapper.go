package main

import (
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"
)

type ParsedBox struct {
	ImageID 	 int32
	BoxID        int32
	Availability int32
}

// Decoded string format (after base64):
// bbox:<image_id>,<box_id>,<availability>;<image_id>,<box_id>,<availability>;...
func ParseBoxes(frmPayload string) ([]ParsedBox, error) {
	if frmPayload == "" {
		return nil, nil
	}

	raw, err := base64.StdEncoding.DecodeString(frmPayload)
	if err != nil {
		return nil, fmt.Errorf("base64 decode frm_payload: %w", err)
	}

	data := strings.TrimSpace(string(raw))
	if strings.HasPrefix(data, "bbox:") {
		data = strings.TrimPrefix(data, "bbox:")
	}

	segs := strings.Split(data, ";")
	out := make([]ParsedBox, 0, len(segs))

	for _, seg := range segs {
		seg = strings.TrimSpace(seg)

		if seg == "" {
			continue
		}

		parts := strings.Split(seg, ",")
		if len(parts) != 3 {
			// skip malformed segments
			continue
		}

		imageID, err1 := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 32)
		boxID, err2 := strconv.ParseInt(strings.TrimSpace(parts[1]), 10, 32)
		avail, err3 := strconv.ParseInt(strings.TrimSpace(parts[2]), 10, 32)
		if err1 != nil || err2 != nil || err3 != nil {
			continue
		}

		if avail != 0 && avail != 1 {
			continue
		}

		out = append(out, ParsedBox{
			ImageID:      int32(imageID),
			BoxID:        int32(boxID),
			Availability: int32(avail),
		})
	}

	return out, nil
}