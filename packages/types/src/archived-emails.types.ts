import type { OriginalDateSource } from './email.types';

/**
 * Represents a single recipient of an email.
 */
export interface Recipient {
	name?: string;
	email: string;
}

/**
 * Represents a single attachment of an email.
 */
export interface Attachment {
	id: string;
	filename: string;
	mimeType: string | null;
	sizeBytes: number;
	storagePath: string;
}

export interface ThreadEmail {
	id: string; //the archivedemail id
	subject: string | null;
	/** The original sent date of the email. Null if the original Date header was missing or unparseable. */
	sentAt: Date | null;
	senderName: string | null;
	senderEmail: string;
}

/**
 * Represents a single archived email.
 */
export interface ArchivedEmail {
	id: string;
	ingestionSourceId: string;
	/** The ingestion source this email belongs to, when loaded (e.g. the detail view). */
	ingestionSource?: { id: string; name: string } | null;
	userEmail: string;
	messageIdHeader: string | null;
	/** The original sent date of the email. Null if the original Date header was missing or unparseable. */
	sentAt: Date | null;
	/**
	 * Source used to populate `sentAt`. Defaults to `'header'` server-side, but is required
	 * here so consumers handle the fallback cases ('received' = Received-header derived,
	 * 'unknown' = no parseable date) explicitly.
	 */
	originalDateSource: OriginalDateSource;
	subject: string | null;
	senderName: string | null;
	senderEmail: string;
	recipients: Recipient[];
	storagePath: string;
	storageHashSha256: string;
	sizeBytes: number;
	isIndexed: boolean;
	/** Number of times indexing has been attempted and failed for this email.
	 * Used by the reconcile job to stop retrying persistently-failing ("poison") emails. */
	indexAttempts?: number;
	hasAttachments: boolean;
	isOnLegalHold: boolean;
	isJournaled: boolean | null;
	archivedAt: Date;
	attachments?: Attachment[];
	raw?: Buffer;
	thread?: ThreadEmail[];
	path: string | null;
	tags: string[] | null;
}

/**
 * Represents a paginated list of archived emails.
 */
export interface PaginatedArchivedEmails {
	items: ArchivedEmail[];
	total: number;
	page: number;
	limit: number;
}
