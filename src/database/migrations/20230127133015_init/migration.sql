-- CreateTable
CREATE TABLE "user" (
    "uuid" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" STRING NOT NULL,
    "money" INT8 NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
