-- CreateTable
CREATE TABLE "User" (
    "uuid" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" STRING NOT NULL,
    "money" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
